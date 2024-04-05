<script>
    import {defineStore} from 'pinia';

    export const useUser = defineStore('main',{
        state: () => ({
            userName: '',
        }),
        actions: {
            setUsername(name){
                this.userName= name;
            },
            logOut(){
                this.userName = '';
            },
        },
    });
</script>