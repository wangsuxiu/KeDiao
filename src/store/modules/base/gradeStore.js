import axios from '../../axios'



export default{
	state:{
		gradeList:[]
	},
	getters:{
		getGradeList:state=>state.gradeList
	},
	mutations:{
		alterGradeList:(state,data)=>{
			state.gradeList=data;
		}
	},
	actions:{
		//返回一个承诺对象，方便调用者添加事件和处理函数
		// 一般为异步操作,ajax
		findGradeList:(context)=>{
			return new Promise((resolve,reject)=>{
				axios.get('/grade/findAll').then(({data})=>{
					if(data.status==200){
						context.commit('alterGradeList',data.data);
						resolve(data);
					}else{
						reject(data);
					}
				})
			});
		},
		saveOrUpdateGrade:(context,grade)=>{
			return new Promise((resolve,reject)=>{
				axios.post('/grade/saveOrUpdate',grade).then(({data})=>{
					if(data.status==200){
						resolve(data);
					}else{
						reject(data);
					}
				}).catch(error=>{reject(error)});
			})
		},
		deleteGrade:(context,id)=>{
			return new Promise((resolve,reject)=>{
				axios.get('/grade/deleteById',{params:{id}}).then(({data})=>{
					if(data.status==200){
						resolve(data);
					}else{
						reject(data);
					}

				}).catch((error)=>{reject(error)});
			});
		},
		batchDeleteGrade:(context,ids)=>{
			return new Promise((resolve,reject)=>{
				axios.get('/grade/batchDelete',{params:{ids}}).then(({data})=>{
					if(data.status==200){
						resolve(data);
					}else{
						reject(data);
					}
				}).catch((error)=>{reject(error)});
			});
		},
	}
}