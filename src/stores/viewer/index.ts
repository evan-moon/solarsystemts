import { Module } from 'vuex';
import { ViewerState } from './state';
import Actions from './actions';
import Getters from './getters';
import Mutations from './mutations';

export class ViewerStoreModule implements Module<ViewerState, any> {
    public state: ViewerState;
    public getters = Getters;
    public mutations = Mutations;
    public actions = Actions;

    constructor() {
        this.state = new ViewerState();
    }
}
