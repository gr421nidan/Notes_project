Vue.component('column', {
    template: `
    <div>
            <div class="block-content">
                <div class="container">
                    <div class="form">
                        <label>
                            <h3>Создайте свою заметку</h3>
                            <input  type="text" v-model="note" placeholder="Введите название" required/>
                        </label>
                        <button class='button' v-on:click="addNote" >Создать</button>
                    </div>
                </div>
            </div>
    <div class="content">
        <div class="left-column">
            <h2>
                <span class="title">Создано</span>
            </h2>
            <ul >
                <div v-for="(note, i) in notesList " :key="i">
                    <div class="card">
                        <span>№{{ i+1 }}</span>
                        <span>{{ note }}</span>
                        <div class="card-content">
                            <div>
                                <input type="checkbox" v-on:click="scoreRadio" >
                                <span>Создание</span>
                            </div>
                            <div>
                                <input type="checkbox" v-on:click="scoreRadio" >
                                <span>Подготовка</span>
                            </div>
                            <div>
                                <input type="checkbox"  v-on:click="scoreRadio">
                                <span>В процессе</span>
                            </div>
                            <div>
                                <input type="checkbox" v-on:click="scoreRadio" disabled="disabled">
                                <span>Внедрение</span>
                            </div>
                            <div>
                                <input type="checkbox" v-on:click="scoreRadio" disabled="disabled" >
                                <span>Завершено</span>
                            </div>
                        </div>
                    </div>
                </div>
            </ul>
        </div>

        <div class="middle-column">
            <h2>
                <span class="title">В процессе</span>
            </h2>
            <ul>
                <div v-for="(note, i) in notesListDo " :key="i">
                    <div class="card">
                        <span>№{{ i+1 }}</span>
                        <span>{{ note }}</span>
                        <div class="card-content">
                            <div>
                                <input type="checkbox" v-on:click="scoreRadioDo" checked>
                                <span>Создание</span>
                            </div>
                            <div>
                                <input type="checkbox" v-on:click="scoreRadioDo" checked>
                                <span>Подготовка</span>
                            </div>
                            <div>
                                <input type="checkbox" v-on:click="scoreRadioDo" checked>
                                <span>В процессе</span>
                            </div>
                            <div>
                                <input type="checkbox" v-on:click="scoreRadioDo" >
                                <span>Внедрение</span>
                            </div>
                            <div>
                                <input type="checkbox" v-on:click="scoreRadioDo" >
                                <span>Завершено</span>
                            </div>
                        </div>

                    </div>
                </div>
            </ul>
        </div>

        <div class="right-column">
            <h2>
                <span class="title">Завершено</span>
            </h2>
            <div v-for="(note, i) in notesListDone " :key="i">
                <div class="card">
                    <span>№{{ i+1 }}</span>
                    <span>{{ note }}</span>
                    <div class="card-content">
                        <div>
                            <input type="checkbox"  checked>
                            <span>Создание</span>
                        </div>
                        <div>
                            <input type="checkbox"  checked>
                            <span>Подготовка</span>
                        </div>
                        <div>
                            <input type="checkbox"  checked>
                            <span>В процессе</span>
                        </div>
                        <div>
                            <input type="checkbox"  checked>
                            <span>Внедрение</span>
                        </div>
                        <div>
                            <input type="checkbox"  checked>
                            <span>Завершено</span>
                        </div>
                    </div>
                    <p>Дата завершения: {{ notesListDo.completionDate }}</p>
                </div>
            </div>
        </div>
    </div>
</div>`,

    data(){
        return{
            note: "",
            notesList: [],
            notesListDo: [],
            notesListDone:[],
            score: 0
        }
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
            l
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
                this.notesListDo.completionDate = new Date().toLocaleString();
            }

        }
    },

});




let app = new Vue({
    el: '#app',
});