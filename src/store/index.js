import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// localstrageに保存しているリストを取得している
// localStorageは保存するデータを「キーと値」のセットで扱います。
// localStorage.getItem('設定したキー')
const savedLists = localStorage.getItem("trello-lists")

// ストアインスタンスを取得
const store =  new Vuex.Store({


//   それでは、mutationsでリストのデータの状態を更新できるように、stateにリストを定義します。
// リストを複数持てるように、配列型でlistsを定義します。

// localStorageに保存されたリストがあれば取得、なければデフォルトのリスト配列を設置します。
// localStorageにはJSON形式の文字列型でデータが保存されているので、取得するときにはJSON.parse(取得するデータ)でオブジェクトに変換する必要があります
  state: {
    lists: savedLists ? JSON.parse(savedLists): [
      {
        title: "Backlog",
        cards: [
          {body: "English"},
          {body: "Mathematics"},
        ]
      },
      {
        title:"Todo",
        cards: [
          {body: "Science"}
        ]
      },
      {
        title:"Doing",
        cards:[]
      }
    ],
  },

//   actionsでコミットするaddListメソッドをmutationsで定義しましょう。
// addListメソッドはstateのデータへリストの追加を行います。
// 実際にストアの状態を変更できる唯一の方法が、mutationsをコミットすることです。
// mutationsは第一引数でstate、第二引数ではコミット時に受け取る引数payloadを指定できます。
// payloadはオブジェクト型で受け取ると、複数のプロパティを受け取ることができるため、推奨されています。
  mutations: {
    addlist(state,payload) {
      state.lists.push({title:payload.title,cards:[]})
    },

    // mutationsのremovelistでは受け取ったリストのインデックスを使ってspliceでリストを削除します
    removelist(state,payload) {
      state.lists.splice(payload.listIndex, 1)
    },

// mutationsのaddCardToListメソッドは、stateのデータへ追加します。
// 前章で、リストの中でカードのデータの状態も管理できるようにストアのstateに定義しました。
// lists配列の中の1つのオブジェクト{}がリスト1つになります。
// リスト内でカードを複数持てるように、配列型でcardsを定義しています。
// addCardToListメソッドは、このcardsへ新しく作成されたカードを追加します。
    addCardToList(state,payload) {
      state.lists[payload.listIndex].cards.push({body:payload.body})
    },

    removeCardFromList(state,payload) {
      state.lists[payload.listIndex].cards.splice(payload.cardIndex,1)
    },
    updateList(state,payload) {
      state.lists = payload.lists
    }
  },

// actionsは第一引数にcontextというストアインスタンスのメソッドやプロパティを呼び出せるオブジェクトを受け取ることができます。
// 第二引数には、mutationsに渡す引数を指定できます
  actions: {
    addlist(context,payload) {
      context.commit("addlist",payload)
    },
    // すでに実装済みのaddListと同じようにactionsでmutationsのremovelistメソッドをcommitで実行しています。
    removelist(context,payload){
      context.commit("removelist",payload)
    },
    addCardToList(context,payload) {
      context.commit("addCardToList",payload)
    },
    removeCardFromList(context,payload) {
      context.commit("removeCardFromList",payload)
    },
    updateList(context,payload) {
      context.commit("updateList",payload)
    }
  },

  // modulesをgettersに修正

// gettersは第一引数にstate、第二引数に他のgettersを受け取ることができます。
// なので、他のgettersで算出したものから、さらに何か算出したいという実装も可能です。
// 今回はstateだけ受け取り、全体のカードの総数を返すように実装しました。
// これでカードの総数も表示できるようになりました。
  getters: {
    totalCardCount(state) {
      let count = 0
      state.lists.map(content => count += content.cards.length)
      return count
    }
  }
})


// データの状態を更新後にlocalStorageへデータの状態を保存しています。
// localStorage.setItem('設定するキー', 文字列型のデータ)

// 保存するときは任意のキーを設定して、データを文字列型に変換して保存します。
// データを文字列型にするにはJSON.stringify(保存するデータ)でJSON形式に変換します。
// subscribeはストアのインスタンスメソッドで、全てのmutationの後に呼ばれます。
// 第一引数にmutationインスタンス、第二引数にmutation後のデータの状態を受け取ります。
store.subscribe((mutation,state) => {
  localStorage.setItem("trello-lists",JSON.stringify(state.lists))
})

export default store
