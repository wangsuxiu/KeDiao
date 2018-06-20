import axios from '../../axios'


export default{
	actions:{
		findSchool(context){
			return new Promise((resolve,reject)=>{
				axios.get('/school/findById',{params:{id:1}}).then(({data})=>{
					// console.log(res.data.data);
					if(data.status==200){
						resolve(data);
					}else{
						reject(data);
					}
				}).catch(error=>{reject(error)});
			});
		},
		saveOrUpdateSchool(context,form){
			return new Promise((resolve,reject)=>{
				axios.post('/school/saveOrUpdate',form).then(({data})=>{
					// console.log(res.data.data);
					if(data.status==200){
						resolve(data);
					}else{
						reject(data);
					}
				}).catch(error=>{reject(error)});
			});
		}
	}

}