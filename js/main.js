let app = new Vue({
    el: '#app',
    data: {
        note: "",
        notesList: [],
        notesListDo: [],
        notesListDone:[],
        score: 0
    },
    methods: {
        addNote(){
            if(this.notesList.length>=3){
                alert('Вы больше не можете добавить!')
            }
            else{
                this.notesList.push(this.note);
            }

        },
    }})