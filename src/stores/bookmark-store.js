import { observable, action, computed } from 'mobx';
import { BaasClient } from 'baas';
import { ListView } from 'react-native';

class Bookmark {
  constructor(data) {
    this.data = data;
  }

  toMapJson() {
    return {
      title: this.data.name,
      description: 'a description',
      coordinate: {
        latitude: parseFloat(this.data.latitude),
        longitude: parseFloat(this.data.longitude)
      }
    };
  }

  toListJson() {
    return this.data;
  }
}

export default class BookmarkStore {
  @observable bookmarks = [];
  @observable loading = false;

  client = new BaasClient('yelp-better-bookmarks-ppuyr');
  service = this.client.service('mongodb', 'mdb');
  ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

  @computed get dataSource() {
    return this.ds.cloneWithRows(this.bookmarks.slice());
  }

  async authenticate() {
    await this.client.authManager.anonymousAuth();
  }

  @action.bound async fetchBookmarks() {
    this.loading = true;
    let result = await this.service.db('yelp').collection('bookmarks').find();
    this.bookmarks = result.map(b => new Bookmark(b));
    console.dir('bookmarks:');
    console.dir(this.bookmarks);

    this.loading = false;
  }
}
