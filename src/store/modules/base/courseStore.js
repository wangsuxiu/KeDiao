import axios from '@/store/axios';
export default{
	state:{
		courseList:[]
	},
	getters:{
		getCourses:state=>state.courseList
	},
	mutations:{
		alterCourses:(state,data)=>{
			state.courseList=data;
		}
	},
	actions:{
		findCourses(context){
			return new Promise((resolve,reject)=>{
				axios.get('/course/findAll').then(({data})=>{
					if(data.status==200){
						context.commit('alterCourses',data.data);
						resolve(data.data);
					}else{
						reject(data.data);
					}
				}).catch((error)=>{reject(error)});
			});
		},
		saveOrUpdateCourse(context,course){
			return new Promise((resolve,reject)=>{
				axios.post('/course/saveOrUpdate',course).then(({data})=>{
					if(data.status==200){
						resolve(data);
					}else{
						reject(data);
					}
				}).catch((error)=>{reject(error)})
			});
		},
		batchDeleteCourses(context,ids){
			return new Promise((resolve,reject)=>{
				axios.get('/course/batchDelete',{params:{ids}}).then(({data})=>{
					if(data.status==200){
						resolve(data);
					}else{
						reject(data);
					}
				}).catch((error)=>{reject(error)})
			});
		},
		deleteCourseById(context,id){
			return new Promise((resolve,reject)=>{
				axios.get('/course/deleteById',{params:{id}}).then(({data})=>{
					if(data.status==200){
						resolve(data);
					}else{
						reject(data);
					}
				}).catch((error)=>{reject(error)})
			});
		}
	}
}