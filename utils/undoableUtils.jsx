import { groupByActionTypes } from 'redux-undo';
import { v4 } from 'uuid';

export const batchGroupBy = {
  _group: null,
  start(group = v4()) {
    this._group = group;
  },
  end() {
    this._group = null;
  },
  init(rawActions) {
    const defaultGroupBy = groupByActionTypes(rawActions);
    return (action, currentState, historyState) =>
      this._group || defaultGroupBy(action, currentState, historyState);
  },
};
