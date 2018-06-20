<template>
	<div class="grade">
		<el-row class="topBtns">
			<el-col :span="12">
				
				<el-select v-model="value4" clearable @change="selectByGradeId">
					<el-option
						v-for="item in getGradeList"
						:key="item.id"
						:label="item.name"
						:value="item.id"
					>
						
					</el-option>
				</el-select>
				<el-input style="width:220px;" placeholder="请输入您想要搜索的内容"></el-input>

			</el-col>
			<el-col :span="12" class="content-right">
				<el-button @click="toaddClazz">添加</el-button>
				<el-button>批量删除</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-table
				    ref="multipleTable"
				    :data="getClassList"
				    tooltip-effect="dark"
				    style="width: 100%;text-align:center"
				  	v-loading="classTblLoading"
					border
					size="mini"

				    >
				    <el-table-column
				      prop="id"
				      align="center"
				      type="selection"
				      width="55">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="班级名称"
				      >
				      
				    </el-table-column>
				    <el-table-column
				      prop="description"
				      label="班级简介"
				      >
				    </el-table-column>
				    <el-table-column
				      prop="charge.name"
				      label="班主任"
				      >
				    </el-table-column>
				    <el-table-column
				      label="操作"
				      show-overflow-tooltip>
				      <template slot-scope="scope">
				      	<el-button type="text" @click="toEdit(scope.row)">修改</el-button>
				      	<el-button type="text">删除</el-button>
				      </template>
				    </el-table-column>
				  </el-table>

			</el-col>
		</el-row>

		<!-- 模态框 -->
		<el-dialog :title="clazzDialog.title" :visible.sync="clazzDialog.visible" @close="closeDialog">
		  <el-form :model="clazzDialog.form" label-width="100px" size="small" :rules="rules" ref="clazzDialogForm">
		    <el-form-item label="班级名称" prop="name">
		      <el-input v-model="clazzDialog.form.name" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="班级简介" prop="description">
		      <el-input type="textarea" v-model="clazzDialog.form.description"></el-input>
		    </el-form-item>
		    <el-form-item label="班主任" prop="charge">
		      <el-input type="textarea" v-model="clazzDialog.form.charge.name"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="clazzDialog.visible = false">取 消</el-button>
		    <el-button type="primary" @click="addClazz">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>


<script>
	import {mapGetters,mapActions} from 'vuex'
	export default{
		data(){
			return {
				value4:'',
				clazzDialog:{
					visible:false,
					title:'',
					form:{
						id:'',
						name:'',
						description:'',
						charge:{

						}
					}
				},
				rules:{
					name:[{required:true,message:'请输入班级名称',trigger:'blur'}],
					description:[{required:true,message:'请输入班级描述',trigger:'blur'}],
					charge:[{required:true,message:'请输入班主任',trigger:'blur'}]
				},
				classTblLoading:false

			}
		},
		computed:{
			...mapGetters(['getClassList','getGradeList']),

					
		},
		created(){
			this.loadClasses();
			this.loadGradeList();
		},
		methods:{
			...mapActions(['findClasses','findGradeList','selectClazzByGradeId']),
			loadClasses(){
				this.classTblLoading=true;
				this.findClasses().finally(()=>{
					this.classTblLoading=false;
				}).catch(()=>{
					this.$notify({
						title:'错误',
						message:'数据加载异常',
						type:'error'
					})
				})
			},
			loadGradeList(){
				this.findGradeList();
			},
			toaddClazz(){
				this.clazzDialog.title="添加班级";
				this.clazzDialog.visible=true;
			},
			addClazz(){
				//1.对用户输入的内容进行校验
				//2.如果校验成功，提交数据
				//3.关闭模态框
				this.$refs['clazzDialogForm'].validate((valid)=>{
					if(valid){
						let clazz=this.clazzDialog.form;
						console.log('submit',clazz);
					}else{
						console.log("error submit");
						return false;
					}
				});
				this.clazzDialog.visible=false;


			},
			closeDialog(){
				// alert("111");
				// console.log('111');
				
				this.clazzDialog.form={
					id:'',
					name:'',
					description:'',
					charge:''
				};

			},
			toEdit(row){
				this.clazzDialog.title='修改班级';
				this.clazzDialog.visible=true;
				this.clazzDialog.form=row;


			},
			selectByGradeId(){
				this.classTblLoading=true;
				let id=+this.value4;
				
				this.selectClazzByGradeId(id).finally(()=>{
					this.classTblLoading=false;
				}).catch(()=>{
					this.$notify({
						title:'错误',
						message:'数据加载异常',
						type:'error'
					})
				})
			}
		}
	}
</script>


<style>
	
</style>