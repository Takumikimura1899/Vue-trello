<template>
<div class="list">
    <div class="listheader">
        <!-- コンポーネントで定義されたデータをテンプレートに”Mustache” 構文(二重中括弧)を使って、直接はめこんでいます -->
        <p class="list-title">{{title}}</p>
        <p class="list-counter">total: {{totalCardInList}}</p>
        <div class="deletelist" @click="removeList">x</div>
    </div>

<!-- draggableコンポーネントはpropsの1つとして、listプロパティを受け取ります。
listプロパティはコンポーネントがドラッグ&ドロップされるたびに定義されたcardsのデータを更新してくれます。
propsで受け取った値は直接更新してはいけないというVueのルールがありました。
単方向のデータフロー
今回のlistは特別ですが、基本的にpropsで受け取った値は直接更新できないということは覚えておきましょう。 -->
<!-- endイベントはドラッグ&ドロップの操作が終わったあと、最後に発生するイベントです。 -->
    <draggable group="cards" :list="cards" @end="$emit('change')">
    <card v-for="(item,index) in cards"
          :body="item.body"
          :key="item.id"
          :cardIndex="index"
          :listIndex="listIndex"
          />
    <card-add :listIndex="listIndex"/>
    </draggable>
</div>
</template>

<script>
import draggable from "vuedraggable"
import CardAdd from './CardAdd.vue'
import Card from "./Card.vue"
export default {
  components: { CardAdd,Card,draggable },
//   draggable,

// ここでまず着目すべき点はpropsプロパティです。
// propsには、親コンポーネントから受け取るデータを定義できます。
// そして受け取ったデータはdataプロパティと同じようにアクセスできます。
// なので、テンプレートで直接呼び出すこともできます

// 例えば、ここではtitleは
//     String型で受け取ること
//     必ず受け取ること
    props: {
        title: {
            type: String,
            required: true
        },

        cards: {
            type: null,
            required: true
        },

        listIndex: {
            type: Number,
            required: true
        }
    },

    computed: {
        totalCardInList() {
            return this.cards.length
        }
    },

// テンプレートでクリック時にハンドルされるように定義したremovelistメソッドをmethodsプロパティに定義しています。
// まだ未定義ですが、this.$store.dispatchでstore/index.jsに定義したremovelistアクションを呼び出します。
    methods: {
        removeList: function() {
            if(confirm("本当にこのリストを削除しますか？")){
                this.$store.dispatch("removelist",{listIndex: this.listIndex})
            }
        },
    }
}
</script>