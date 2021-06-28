<template>
<!--アットマークはブイオンの省略記法 イベントをハンドルしている -->
<form :class="classList" @submit.prevent="addList">
    <!-- v-modelでデータバインディング -->
    <!-- <input :value="title" @input="title = $event.target.value"> と同じ挙動-->
    <input v-model="title" type="text" class="text-input" placeholder="Add new list" @focusin="startEditing" @focusout="finishEditing">

    <!-- v-ifディレクティブに、フォームが活性の時（isEditing）と、
    テキストが入力された時(titleExists)を指定しました。なので、どちらかがtrueの時だけボタンが表示されます -->
    <button type="submit" class="add-button" v-if="isEditing || titleExists">Add</button>
</form>
</template>

<script>
export default {
    // isEditingというフラグを立てて、trueの時（フォーカスされている時）だけstyleを追加するようにしましょう。
    data: function() {
        return{
            title:"",
            isEditing: false,
        }
    },

    // dataの状態を監視できるcomputedを使いましょう。
    computed: {
        classList() {
            const classList = ["addlist"]

            if (this.isEditing) {
                classList.push("active")
            }

            if (this.titleExists) {
                classList.push("addable")
            }
            return classList
        },
        titleExists() {
            return this.title.length >0
        }
    },

    methods: {
        addList: function(){
            // this.$store.dispatch('アクション名')でactionsを実行できます。
            // 第二引数にオブジェクト型でdataプロパティのtitleを渡します。これで、リストを作成し、ストアでデータの状態を管理できるようになりました。
            this.$store.dispatch("addlist",{title: this.title})
            this.title = ""
        },
        startEditing: function(){
            this.isEditing = true
        },
        finishEditing: function(){
            this.isEditing = false
        },
    },
}
</script>