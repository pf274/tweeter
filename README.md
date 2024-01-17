# Tweeter-Web

A starter project for the Tweeter Web application.

## Setting Up the Project

1. cd into the tweeter-shared folder
1. Run 'npm install'
1. run 'npm run build'
1. cd into the tweeter-web folder
1. Run 'npm install'
1. Run 'npm run build'

**Note:** VS Code seems to have a bug. After doing this, you should be able to run the project but code editors report that they can't see the 'tweeter-shared' module. Restarting VS Code fixes the problem. You will likely need to restart VS Code every time you compile or build the 'tweeter-shared' module.

**Note:** If you are using Windows, make sure to use a Git Bash terminal instead of Windows Powershell. Otherwise, the scripts won't run properly in tweeter-shared and it will cause errors when building tweeter-web.

## Rebuilding the Project
Rebuild either module of the project (tweeter-shared or tweeter-web) by running 'npm run build' after making any code or configuration changes in the module. The 'tweeter-web' module is dependent on 'tweeter-shared', so if you change 'tweeter-shared' you will also need to rebuild 'tweeter-web'. After rebuilding 'tweeter-shared' you will likely need to restart VS Code (see note above under 'Setting Up the Project').

## Running the Project
Run the project by running 'npm start' from within the 'tweeter-web' folder.

## Project Instructions

### Project Milestone 1 Instructions
https://byu.instructure.com/courses/24408/assignments/853944
1. Create a StatusItem component to eliminate duplication in the Feed and Story UI. https://youtu.be/X6_yrDE-T6E
2. Create an AuthenticationFields component to remove the duplicate UI logic for displaying the Alias and Password fields in the Login and Register components.  https://youtu.be/X6_yrDE-T6E
3. Create an OAuth component, as described in the video, to remove the OAuth fields from the AuthenticationFormLayout component. https://youtu.be/X6_yrDE-T6E
4. Eliminate the duplication in FeedScroller and StoryScroller by creating a StatusItemScroller. https://youtu.be/ZerBWYWo3_4
5. Create the userNavigationHook https://youtu.be/ccqJH47MMOo
6. Create the userInfoHook https://youtu.be/ccqJH47MMOo

### Project Milestone 2 Part A Instructions - Structure
https://byu.instructure.com/courses/24408/assignments/853945
1. Refactor the provided code to have a proper layered architecture. Your refactored design should include: https://youtu.be/nZWlCfY-cpg
    * A view layer consisting of React components and React Hooks. [Already created but will need to be modified]
    * A presenter layer.
    * An application logic layer (i.e. your service classes).
    * A domain model layer. [This already exists in the tweeter-shared module and likely will not need to change]
2. You are to use the observer pattern as demonstrated in the M2A demo video to communicate from the presenter layer to the view layer. The use of async/await prevents the need to use the observer pattern to communicate from the service layer to the presenter layer.

### Project Milestone 2 Part B Instructions - Code Duplication
https://byu.instructure.com/courses/24408/assignments/853946
1. You are to use the following programming techniques to remove code duplication: https://youtu.be/mAI-4YiB8O8
    * Inheritance (including but not limited to the template method pattern)
    * Composition/Delegation
    * Generic types
    * Passing functions as parameters
    * React component creation (applicable to the view layer only)
    * React Hook creation (applicable to the view layer only)
2. Areas to check:
    * Every presenter defines a View interface to communicate with it's component or hook. These View interfaces might have operations in common (e.g., for displaying error messages or displaying informational messages). (hint: create a base View interface)
    * Every Presenter contains a reference to its View
    * The Presenter classes for the paging views (Feed, Story, Followers, Following) are almost identical, including their View interfaces.  Use inheritance and generic types to remove this duplication as demonstrated in the video.
    * All presenters following a common try/catch/display error structure. Use a function with function parameters to eliminate this duplication as demonstrated in the video.
    * Login and Register have a common structure for authenticating a user and then instructing the view to navigate somewhere. Use a function with function parameters to eliminate this duplication. The code described here will already be wrapped in a function that is passed as a parameter after you resolve the common try/catch/display error structure. Your de-duplicated authentication logic will end up being a function parameter within a function parameter.
    * The UserItemScroller and StatusItemScroller components are practically identical https://youtu.be/kEsC0rbVpPY

### Project Milestone 2 Part C Instructions - Automated Testing
https://byu.instructure.com/courses/24408/assignments/853947
1. Install testing packages https://byu.instructure.com/courses/24408/pages/tweeter-project-testing-setup-tutorial
2. Use Jest and ts-mockito to write tests for two of your presenters: AppNavbarPresenter and PostStatusPresenter. https://youtu.be/atgtjXqTFbM
3. Your presenter code can be somewhat simpler than what is shown in the video. In this part of the video (~22:30 - 26:00), we explain the need to instantiate the service in a getter instead of in the constructor. This is not necessary. The spy is able to mock the getter without the need to change the presenter code to instantiate the service in the getter. (See instructure for details)
4. Write AppNavbarPresenter tests as shown in the video. When you are through, your tests should test the following functionality of the presenter's logout method:
    * The presenter tells the view to display a logging out message.
    * The presenter calls logout on the user service with the correct auth token.
    * When the logout is successful, the presenter tells the view to clear the last info message, clear the user info, and navigate to the login page.
    * When the logout is not successful, the presenter tells the view to display an error message and does not tell it to do the following: clear the last info message, clear the user info, and navigate to the login page.
5. Write PostStatusPresenter tests similar to the AppNavbarPresenter tests demonstrated in the video. Specifically, your tests should test the following functionality of the postStatus method:
    * The presenter tells the view to display a posting status message.
    * The presenter calls postStatus on the post status service with the correct status string and auth token.
    * When posting of the status is successful, the presenter tells the view to clear the last info message, clear the post, and display a status posted message.
    * When posting of the status is not successful, the presenter tells the view to display an error message and does not tell it to do the following: clear the last info message, clear the post, and display a status posted message.
6. Use Jest, ts-mockito  and React Testing Library to write tests for two of your Components: Login and PostStatus. https://youtu.be/vLJ69jSD0Zc
7. Write Login component tests as shown in the video. When you are through, your tests should test the following functionality of the Login component:
    * When first rendered the sign-in button is disabled.
    * The sign-in button is enabled when both the alias and password fields have text.
    * The sign-in button is disabled if either the alias or password field is cleared.
    * The presenter's login method is called with correct parameters when the sign-in button is pressed.
8. Write PostStatus component tests similar to the Login component tests demonstrated in the video. Specifically, your tests should test the following functionality of the PostStatus component:
    * When first rendered the Post Status and Clear buttons are both disabled.
    * Both buttons are enabled when the text field has text.
    * Both buttons are disabled when the text field is cleared.
    * The presenter's postStatus method is called with correct parameters when the Post Status button is pressed.
9. Check instructure page for mocking userInfoHook
10. Create and submit the report https://byu.instructure.com/courses/24408/assignments/853948

### Project Milestone 2 Part D Instructions - Documents
https://byu.instructure.com/courses/24408/assignments/853948
1. Create and submit the report

### Project Milestone 3
...

### Project Milestone 4
...

