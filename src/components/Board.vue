<template>
<div>
    <header>
        my Trello
    </header>
    <main>
        <p class="info-line">All: {{totalCardCount}} tasks</p>
        <draggable :list="lists" @end="movingList" class="list-index">

<!-- ここで、Listコンポーネントを呼び出し、Listコンポーネントに必要なデータを渡しています。
必要なデータとは、先ほどListコンポーネント作成時にpropsで受け取れるように定義したデータのことです。
受け渡すリストの配列データlistsをv-forディレクティブを使って展開できます。
v-forはlistsから展開された、現在の値itemとそのインデックスindexを受け取ることができます。
itemからさらにlistsで定義されたオブジェクトのキーで値にアクセスできます

ちなみにv-forを使うとき、key属性を与えることが必須であると公式ページのスタイルガイドにも載っています。
indexのように要素が削除された場合、値が変わってしまうものではなく、item.idのように一意で変わることがない値を設定するのを強く推薦されています。
そして、展開した値をv-bindディレクティブを使ってバインドさせています

-->


        <!-- v-bindは:と省略して記述できます -->
<!-- 
        ここでchangeイベントをハンドルし、movingCardメソッドを発火します。
        movingCardメソッドでストアのactionsを呼び出します。 -->
        <list v-for="(item,index) in lists"
              :key="item.id"
              :title="item.title"
              :cards="item.cards"
              :listIndex="index"
              @change="movingCard"
        />
        <list-add/>
        </draggable>
    </main>
</div>
</template>

<script>
import draggable from "vuedraggable"
import ListAdd from "./ListAdd.vue"
import List from "./List"
import {mapState} from "vuex"


export default {
    components: {
        ListAdd,
        List,
        draggable,
    },

// store/index.jsで定義したstateにthis.$store.stateでアクセスすることもできますが、これを複数書いていくことを考えるとコードが助長になっていきます。
// そこで活躍するのがmapStateです。
// stateで定義されたデータの名前と同じ名前の文字列でstateを呼び出すことができます。

// このようにオブジェクトスプレッド演算子（...の部分です）を使っているのは、computedのローカルのオブジェクトと一緒に定義できるようにするためです。
// そもそも、computedにはオブジェクトを渡さないといけないルールがあります。 mapStateはこのオブジェクトスプレッド演算子を使わないと、オブジェクトを持ったオブジェクト（ネストされた状態）を返してしまい、computedはmapStateに定義された値を参照できないのです。
// 少し難しい部分ですが、computedにストアのstateからのデータと、ローカルでの算出データを両方定義する場合には、このように書く必要があると知っておいてください
    computed: {
        ...mapState(["lists"]),
        totalCardCount() {
            return this.$store.getters.totalCardCount
        }
    },
    methods: {
        movingCard: function() {
            this.$store.dispatch("updateList",{lists: this.lists})
        },
        movingList: function() {
            this.$store.dispatch("updateList",{lists: this.lists})
        }
    }
}
</script>