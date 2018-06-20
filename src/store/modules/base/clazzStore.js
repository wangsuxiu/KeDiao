import axios from '@/store/axios'
export default{
	state:{
		classList:[]
	},
	getters:{
		getClassList:state=>state.classList
	},
	mutations:{
		alterClassList:(state,data)=>{
			state.classList=data;
		},
		pushClass:(state,data)=>{
			state.classList=[];
			state.classList.push(data);
		}
	},
	actions:{
		findClasses(context){
			return new Promise((resolve,reject)=>{
				axios.get('/clazz/findAllVM').then(({data})=>{
					if(data.status==200){
						context.commit('alterClassList',data.data);
						resolve(data.data);
					}else{
						reject(data.data);
					}
				}).catch((error)=>{reject(error)})
			});
		},
		selectClazzByGradeId(context,id){
			return new Promise((resolve,reject)=>{
				axios.get('/clazz/findVMById',{params:{id}}).then(({data})=>{
					if(data.status==200){
						context.commit('pushClass',data.data);
						resolve(data.data);
					}else{
						reject(data.data);
					}
				}).catch((error)=>{reject(error)})
			});
		}
	}
}