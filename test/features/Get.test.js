import { createStore } from '../supports/Helper'

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Model } from '@vuex-orm/core'
import AxiosRequestConfig from '../supports/AxiosRequestConfig'

test('adds 1 + 2 to equal 3', () => {
  class User extends Model {
    static entity = 'users'

    static fields () {
      return {
        id: this.attr(null),
        name: this.attr(''),
      }
    }

    // static methodConf = {
    //   http: AxiosRequestConfig,
    //   methods: {
    //     $fetch: {
    //       name: 'fetch',
    //       http: {
    //         url: 'users',
    //         method: 'get',
    //       },
    //     },
    //   }
    // }
  }

  const store = createStore([{ model: User }])

  const mock = new MockAdapter(axios);
  mock.onGet('/users').reply(200, {
    data: [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ],
  });

  User.$fetch().then( response => {
    console.log('entitity')
    console.log(store.state.entities.users)

    console.log('success')
    console.log(response)
    const users = User.all()
    console.log(users[0].id)
    // expect(users[0].id).toEqual(1)
    // expect(users[0].name).toEqual('John')
    // expect(users[1].id).toEqual(2)
    // expect(users[1].name).toEqual('Jane')
  }).catch(e => {
    console.log('err')
    console.log(e)
  })
});
