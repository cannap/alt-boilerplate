class RequestsStore {

  constructor() {
    this.bindActions(this.alt.getActions('requests'));
    this.inProgress = false;
    this.request = undefined;
    this.status = undefined;
  }

  onStart(request) {
    this._setInProgress(request, 'progress');
  }

  onSuccess(request) {
    this._setInProgress(request, 'success');
  }

  onFail(request) {
    this._setInProgress(request, 'failed');
  }

  _setInProgress(request, status) {
    return this.setState({
      inProgress: status === 'progress',
      request: request,
      status: status
    });
  }

}

export default RequestsStore;
