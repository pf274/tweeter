export interface View {
  displayErrorMessage: (message: string) => void;
}

export interface MessageView extends View {
  clearLastInfoMessage: () => void;
  displayInfoMessage: (message: string, duration: number) => void;
}

export class Presenter {
  private _view: View;

  protected constructor(view: View) {
    this._view = view;
  }

  protected get view(): View {
    return this._view;
  }

  protected async doFailureReportingOperation(
    operation: () => Promise<void>,
    intent: string
  ): Promise<void> {
    try {
      await operation();
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to ${intent} because of exception: ${(error as Error).message}`
      );
    }
  }
}
