Vue.component('column', {
    template: `
<div>
    <div class="content">
    <form @submit.prevent="addCard">
        <label for="card-title">Создайте свою заметку:</label>
        <input id="card-title" type="text" v-model="cardName"><br>

        <label for="card-items">Создайте пункты заметки:</label><br>
        <textarea id="card-items" v-model="checkText"></textarea><br>

        <button type="submit">Создать</button>
    </form>
    </div>
    <div class="column">
        <h2 class="title_column">Новые</h2>
        <div v-for="card in notesList" :key="card.id" class="card">
            <h3>{{ card.title }}</h3>
            <ul>
                <li v-for="item in card.items" :key="item.id">
                    <input type="checkbox" v-model="item.completed" @change="handleCardPosition(card)">
                    <span :class="{ completed: item.completed }">{{ item.text }}</span>
                </li>
            </ul>
        </div>
    </div>
    <div class="column">
        <h2 class="title_column">В процессе</h2>
        <div v-for="card in notesListProgress" :key="card.id" class="card">
            <h3>{{ card.title }}</h3>
            <ul>
                <li v-for="item in card.items" :key="item.id">
                    <input type="checkbox" v-model="item.completed" @change="handleCardPosition(card)">
                    <span :class="{ completed: item.completed }">{{ item.text }}</span>
                </li>
            </ul>
        </div>
    </div>
    <div class="column">
        <h2 class="title_column">Завершённые</h2>
        <div v-for="card in notesListCompleted" :key="card.id" class="card">
            <h3>{{ card.title }}</h3>
            <ul>
                <li v-for="item in card.items" :key="item.id">
                    <input type="checkbox" v-model="item.completed">
                    <span :class="{ completed: item.completed }">{{ item.text}}</span>
                </li>
            </ul>
            <div v-if="card.completedDate">
                Последнее выполнение: {{ card.completedDate }}
            </div>
        </div>

    </div>
</div>`,

    data() {
        return {
            notesList: [],
            notesListProgress: [],
            notesListCompleted: [],
            cardName: '',
            checkText: '',
        }
    },
    mounted(){
        if (localStorage.getItem('notesList')) {
            try {
                this.notesList = JSON.parse(localStorage.getItem('notesList'));
            } catch(e) {
                localStorage.removeItem('notesList');
            }
        }
        if (localStorage.getItem('notesListProgress')) {
            try {
                this.notesListProgress = JSON.parse(localStorage.getItem('notesListProgress'));
            } catch(e) {
                localStorage.removeItem('notesListProgress');
            }
        }
        if (localStorage.getItem('notesListCompleted')) {
            try {
                this.notesListCompleted = JSON.parse(localStorage.getItem('notesListCompleted'));
            } catch(e) {
                localStorage.removeItem('notesListCompleted');
            }
        }

    },

    methods: {
        handleCardPosition(card) {
            const totalItems = card.items.length;
            const completedItems = card.items.filter(item => item.completed).length;


                if (completedItems / totalItems > 0.5 && this.notesList.includes(card)) {

                    if(this.notesListProgress.length>=5){alert('Выполните задачи 2 столбца!')}
                    else {this.notesList.splice(this.notesList.indexOf(card), 1);
                        this.notesListProgress.push(card);}
                        this.saveLocalStorage();
                }


            else if (completedItems / totalItems === 1 && this.notesListProgress.includes(card)) {
                this.notesListProgress.splice(this.notesListProgress.indexOf(card), 1);
                this.notesListCompleted.push(card);
                card.completedDate = new Date().toLocaleString(); // добавляем дату и время завершения
                this.saveLocalStorage();
            }
        },
        addCard() {
            if (this.cardName !== '' && this.notesList.length < 3) {
                const newCard = {
                    id: Date.now(),
                    title: this.cardName,
                    items: this.checkText.split('\n').filter(item => item.trim() !== '').map(item => ({ text: item, completed: false }))
                };
                if (this.cardName !== '' && newCard.items.length >= 3 && newCard.items.length <= 5) {
                    this.notesList.push(newCard);
                }
                else alert("Введите правильные значения!!!")
                {

                }
                this.handleCardPosition(newCard);
                this.cardName = '';
                this.checkText = '';
                this.saveLocalStorage();

            }




        },
        saveLocalStorage() {
            const parsed = JSON.stringify(this.notesList);
            const parsed1 = JSON.stringify(this.notesListProgress);
            const parsed2 = JSON.stringify(this.notesListCompleted);
            localStorage.setItem('notesList', parsed);
            localStorage.setItem('notesListProgress', parsed1);
            localStorage.setItem('notesListCompleted', parsed2);
        },





    }

});




let app = new Vue({
    el: '#app',
});