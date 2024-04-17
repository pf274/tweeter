import { Status } from "../../../utils/shared-models/domain/Status";
import { User } from "../../../utils/shared-models/domain/User";
import { DDBFactory } from "./database/DDBFactory";
import Chance from "chance";
import bcrypt from "bcryptjs";
import { StatusService } from "../../services/StatusService";
import { AuthToken } from "../../../utils/shared-models/domain/AuthToken";

const instance = new DDBFactory();
const chance = new Chance();
const url = `https://tweeter-content.s3.us-east-1.amazonaws.com/image/@lnk`;

async function generateUsers() {
  const records = [];
  for (let i = 0; i < 10000; i++) {
    const alias = `@${chance.animal()}${chance.integer({ min: 0, max: 10000 })}`.replaceAll(
      /[^a-zA-Z0-9@]/g,
      ""
    );
    const record = {
      alias,
      password: chance.string({ length: 10 }),
      firstName: chance.first(),
      lastName: chance.last(),
      url,
      numFollowers: 0,
      numFollowees: 0,
    };
    records.push(record);
    await instance.userDAO.saveUser(
      record.alias,
      record.password,
      record.firstName,
      record.lastName,
      record.url,
      record.numFollowers,
      record.numFollowees
    );
    console.log(`Generated user ${i}: ${record.firstName} ${record.lastName}`);
  }
  return records;
}

async function generateFollowers() {
  const users: any[] = await getAllUsers();
  const records = await getAllFollowers();
  // generate some followers
  for (let i = 0; i < 10000; i++) {
    const follower = users[chance.integer({ min: 0, max: 9999 })];
    const followee = users[chance.integer({ min: 0, max: 9999 })];
    if (follower.alias === followee.alias) {
      continue;
    }
    if (
      records.find(
        (record) =>
          (record as any).follower_handle === follower.alias &&
          (record as any).followee_handle === followee.alias
      )
    ) {
      continue;
    }
    records.push({ follower_handle: follower.alias, followee_handle: followee.alias });
    await instance.followsDAO.follow(follower.alias, followee.alias);
    console.log(`${records.length} - ${follower.alias} followed ${followee.alias}`);
  }
  // make sure Link has more than 10000 followers
  for (let i = 0; i < users.length; i++) {
    const follower = users[i];
    if (follower.handle === "@link") {
      continue;
    }
    if (records.find((record) => (record as any).follower_handle === follower.handle)) {
      continue;
    }
    records.push({ follower_handle: follower.alias, followee_handle: "@link" });
    await instance.followsDAO.follow(follower.alias, "@link");
    console.log(`${records.length} - ${follower.alias} followed @link`);
  }
}

async function generateStories() {
  const users: any[] = await getAllUsers();
  // generate some stories
  const authToken = new AuthToken("test", Date.now());
  for (let i = 0; i < 10000; i++) {
    const author = users[chance.integer({ min: 0, max: users.length - 1 })];
    const user = new User(
      author.firstName,
      author.lastName,
      author.handle,
      author.imageURL,
      await bcrypt.hash(author.encryptedPassword, 10)
    );
    // console.log(JSON.stringify(user.dto, null, 2));
    const status = new Status(
      `I am a ${chance.animal()}! My profession: ${chance.profession()}`,
      user,
      Date.now()
    );
    // console.log(JSON.stringify(status.dto, null, 2));
    await StatusService.postStatus(authToken, status);
    console.log(`${i}: ${author.firstName} ${author.lastName}`);
  }
}

async function getAllUsers() {
  const users = [];
  let lastItem = undefined;
  do {
    const response: { items: object[]; lastItemReturned: object | undefined } =
      await instance.userDAO.dbFuncs.getMany(100, lastItem);
    users.push(...response.items);
    lastItem = response.lastItemReturned;
    console.log(`Got ${users.length} users`);
  } while (lastItem);
  return users;
}

async function fixUsernames() {
  const users = await getAllUsers();
  for (let i = 0; i < users.length; i++) {
    const user: any = users[i];
    const alias = user.handle;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const url = user.imageURL;
    const password = user.encryptedPassword;
    let newAlias = alias.replaceAll(/[^a-zA-Z0-9@]/g, "");
    if (newAlias.length === 0) {
      newAlias = `@${chance.animal()}${chance.integer({ min: 0, max: 10000 })}`.replaceAll(
        /[^a-zA-Z0-9@]/g,
        ""
      );
    } else if (newAlias.charAt(0) !== "@") {
      newAlias = `@${newAlias}`;
    }
    if (alias === newAlias) {
      continue;
    }
    await instance.userDAO.dbFuncs.delete("handle", alias);
    await instance.userDAO.saveUser(newAlias, password, firstName, lastName, url);
    console.log(`${i} - ${alias} -> ${newAlias}`);
  }
}

async function getAllFollowers() {
  const items = [];
  let lastItem = undefined;
  do {
    const response: { items: object[]; lastItemReturned: object | undefined } =
      await instance.followsDAO.dbFuncs.getMany(100, lastItem);
    items.push(...response.items);
    lastItem = response.lastItemReturned;
    console.log(`Got ${items.length} followers`);
  } while (lastItem);
  return items;
}

async function deleteFollowers() {
  const items = await getAllFollowers();
  for (let i = 0; i < items.length; i = Math.min(items.length - 1, i + 20)) {
    const itemsToDelete: any[] = items.slice(i, i + 20);
    await instance.followsDAO.dbFuncs.deleteMany(
      itemsToDelete.map((item) => ({
        attributeName: "follower_handle",
        attributeValue: item.follower_handle,
        secondaryAttributeName: "followee_handle",
        secondaryAttributeValue: item.followee_handle,
      }))
    );
    console.log(`Deleted followers ${i} to ${i + 20}`);
  }
}

// generateStories();
