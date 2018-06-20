<template>
	<div class="school" v-loading="schoolFormLoading">
		<el-row>
			<el-col :span="24" >
				<el-form  label-width="100px"  ref="schoolForm" :model='form' :rules='rules'>
				  <el-form-item label="校园名称" prop="name">
				    <el-input size="small" v-model="form.name"></el-input>
				  </el-form-item>
				  <el-form-item label="校园logo" prop="logo">
				    <el-input size="small" v-model="form.logo"></el-input>
				  </el-form-item>
				  <el-form-item label="校园介绍" prop="description"> 
				    <el-input size="small" v-model="form.description"></el-input>
				  </el-form-item>
				  <el-form-item label="校园地址" prop="address">
				    <el-input size="small" v-model="form.address"></el-input>
				  </el-form-item>
				  <el-form-item label="校园电话" prop="telephone">
				    <el-input size="small" v-model="form.telephone"></el-input>
				  </el-form-item>
				  <el-form-item label="版权信息" prop="copyright">
				    <el-input size="small" v-model="form.copyright"></el-input>
				  </el-form-item>
				  
				</el-form>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24" class="content-right" style="margin-top:1em">
				<el-button type="primary" @click="submitForm">保存</el-button>  
			</el-col>
		</el-row>
		
	</div>
</template>


<script>
	import {mapGetters,mapActions} from 'vuex'
	export default{
		data(){
			return {
				form:{

				},
				rules:{
					name:[{required:true,message:'请输入学校名称',trigger:'blur'}],
					logo:[{required:true,message:'请输入logo',trigger:'blur'}],
					description:[{required:true,message:'请输入介绍',trigger:'blur'}],
					address:[{required:true,message:'请输入地址',trigger:'blur'}],
					telephone:[{required:true,message:'请输入电话',trigger:'blur'}],
					copyright:[{required:true,message:'请输入版权信息',trigger:'blur'}]

				},
				schoolFormLoading:false
			}
			
		},
		created(){
			this.loadSchool();
		},
		computed:{
			
		},
		methods:{
			...mapActions(['findSchool','saveOrUpdateSchool']),
			submitForm(){
				this.$refs['schoolForm'].validate(valid=>{
					if(valid){
						this.saveOrUpdateSchool(this.form).then(()=>{
							this.$notify({
								title:'成功',
								message:'数据保存成功',
								type:'success'
							});
							this.loadSchool();
						}).catch((error)=>{
							this.$notify({
								title:'错误',
								message:'数据保存失败',
								type:'error'
							})
						})
					}else{
						console.log('error submit');
						return false;
					}
				})
			},
			loadSchool(){
				this.schoolFormLoading=true;
					this.findSchool().then((res)=>{
					this.form=res.data;
					
				}).catch((error)=>{
					this.$notify({
						title:'错误',
						message:'数据加载异常',
						type:'error'
					});
				}).finally(()=>{
					this.schoolFormLoading=false;
				})
			},

		}
	}
</script>


<style scoped>
	.school{
		padding:0 20px;
	}
	.el-form-item{
		margin-bottom:0;
	}
</style>