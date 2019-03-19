import Vue from 'vue';
import Vuex from 'vuex';
import VuexORM from '@vuex-orm/core';
import VuexORMAxios from '../../src';

Vue.use(Vuex);

/**
 * Create a new Vuex Store.
 */
export function createStore (entities, namespace) {
  const database = new VuexORM.Database();
  VuexORM.use(VuexORMAxios, {
    database,
    http: {
      baseURL: 'https://jsonplaceholder.typicode.com',
      url: '/',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    },
  });

  entities.forEach((entity) => {
    database.register(entity.model, entity.module || {});
  });

  return new Vuex.Store({
    plugins: [VuexORM.install(database, { namespace })],
    // strict: true,
  });
}

export default {
  createStore,
}
