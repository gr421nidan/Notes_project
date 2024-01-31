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
                alert('Достигнуто максимальное количество карточек в столбце!')
                return
            }
            else{
                this.notesList.push(this.note);
            }

        },
        scoreRadio() {
            if(this.notesListDo.length>=5){
                alert('Нельзя добавить')
                return
            }
            else{
                this.score += 1
                console.log(this.score)
                if (this.score >=3 && this.score < 5){
                    for(let element in this.notesList) {
                        this.notesList.splice(this.notesList[element], 1)

                    }
                    this.notesListDo.push(this.note)
                    this.score = 0
                }
            }
        },
        scoreRadioDo(){
            this.score += 1
            console.log(this.score)
            if (this.score >= 2){
                for(let element in this.notesListDo) {
                    this.notesListDo.splice(this.notesListDo[element], 1)
                }
                this.score = 0
                this.notesListDone.push(this.note)
            }
        }


    }})