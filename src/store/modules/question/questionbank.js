import axios from '@/store/axios'
export default{
	state:{
		questionList:[]
	},
	getters:{
		getQuestion:state=>state.questionList


	},
	mutations:{
		alterQuestion:(state,data)=>{
			state.questionList=data;
		}
	},
	actions:{
		findQuestions(context){
			return new Promise((resolve,reject)=>{
				axios.get('/question/findAllVM').then(({data})=>{
					if(data.status==200){
						context.commit('alterQuestion',data.data);
						resolve(data);
					}else{
						reject(data);
					}
				}).catch((error)=>{reject(error)})
			});
		},
		findQuestionTypes(context){
			return new Promise((resolve,reject)=>{
				axios.get('/question/findAllQuestionType').then(({data})=>{
					if(data.status==200){
						resolve(data);
					}else{
						reject(data);
					}
				}).catch((error)=>{reject(error)})
			});
		},
		saveOrUpdateQuestion(context,question){
			return new Promise((resolve,reject)=>{
				axios.post('/question/saveOrUpdate',question).then(({data})=>{
					if(data.status==200){
						resolve(data);
					}else{
						reject(data);
					}
				}).catch((error)=>{reject(error)})
			});
		},
		deleteQuestionById(context,id){
			return new Promise((resolve,reject)=>{
				axios.get('/question/deleteById',{params:{id}}).then(({data})=>{
					if(data.status==200){

						resolve(data);
					}else{
						reject(data);
					}
				}).catch((error)=>{
						reject(error);
				})
			})
		}
	}


}