<template>
	<div class="course">
		<el-row class="topBtns">
			<el-col :span="12">
				<el-select v-model="value4" clearable>
					<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					>
						
					</el-option>
				</el-select>
				<el-input style="width:220px;" placeholder="请输入您想要搜索的内容"></el-input>

			</el-col>
			<el-col :span="12" class="content-right">
				<el-button @click="toaddCourse">添加</el-button>
				<el-button @click="toBatchDeleteCourse">批量删除</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-table
				    ref="multipleTable"
				    :data="getCourses"
				    tooltip-effect="dark"
				    style="width: 100%;text-align:center"
				  	@selection-change="handleSelectionChange"
					border
					size="mini"
					v-loading="courseTblLoading"
				    >
				    <el-table-column
				      prop="id"
				      align="center"
				      type="selection"
				      width="55">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="课程名称"
				      >
				      
				    </el-table-column>
				    <el-table-column
				      prop="period"
				      label="课程周期"
				      >
				    </el-table-column>
				    <el-table-column
				      prop="description"
				      label="课程简介"
				      >
				    </el-table-column>
				    <!-- <el-table-column
				      
				      label="适用年级"
				      >
				    </el-table-column> -->
				    <el-table-column
				      label="操作"
				      show-overflow-tooltip>
				      <template slot-scope="scope">
				      	<el-button type="text" @click="toEdit(scope.row)">修改</el-button>
				      	<el-button type="text" @click="toDeleteCourse(scope.row)">删除</el-button>
				      </template>
				    </el-table-column>
				  </el-table>

			</el-col>
		</el-row>

		<!-- 模态框 -->
		<el-dialog :title="courseDialog.title" :visible.sync="courseDialog.visible" @close="closeDialog">
		  <el-form :model="courseDialog.form" label-width="100px" size="small" :rules="rules" ref="courseDialogForm">
		    <el-form-item label="课程名称" prop="name">
		      <el-input v-model="courseDialog.form.name" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="课程周期" prop="period">
		      <el-select v-model="courseDialog.form.period">
		      	<el-option label="10周" value="10"></el-option>
		      	<el-option label="8周" value="8"></el-option>
		      	<el-option label="12周" value="12"></el-option>
		      </el-select>
		    </el-form-item>
		    <el-form-item label="课程介绍" prop="description">
		      <el-input type="textarea" v-model="courseDialog.form.description"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="courseDialog.visible = false">取 消</el-button>
		    <el-button type="primary" @click="addCourse">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>


<script>
	import {mapGetters,mapActions} from 'vuex'
	export default{
		data(){
			return {
				options:[
					{
						label:'张三',
						value:'选项一'
					},
					{
						label:'李四',
						value:'选项二'
					}
				],
				value4:'',
				courseDialog:{
					visible:false,
					title:'',
					form:{
						id:'',
						name:'',
						period:'',
						description:'',
					}
				},
				rules:{
					name:[{required:true,message:'请输入课程名称',trigger:'blur'}],
					description:[{required:true,message:'请输入课程描述',trigger:'blur'}],
					period:[{required:true,message:'请输入课程周期',trigger:'blur'}]
				},
				courseTblLoading:false,
				selectIds:[]

			}
		},
		created(){
			this.loadCourses();
		},
		computed:{
			...mapGetters(['getCourses'])
		},
		methods:{
			...mapActions(['findCourses','saveOrUpdateCourse','batchDeleteCourses','deleteCourseById',]),
			loadCourses(){
				this.courseTblLoading=true;
				this.findCourses().finally(()=>{
					this.courseTblLoading=false;
				}).catch(()=>{
					this.$notify({
						title:'错误',
						message:'数据加载异常',
						type:'error'
					});
				})
			},
			toaddCourse(){
				this.courseDialog.title="添加课程";
				this.courseDialog.visible=true;
			},
			addCourse(){
				//1.对用户输入的内容进行校验
				//2.如果校验成功，提交数据
				//3.关闭模态框
				this.$refs['courseDialogForm'].validate((valid)=>{
					if(valid){
						let course=this.courseDialog.form;
						this.saveOrUpdateCourse(course).then(()=>{
							this.courseDialog.visible=false;
							this.$notify({
								title:'成功',
								message:'数据保存成功',
								type:'success'
							});
							this.loadCourses();
						}).catch((error)=>{
							this.$notify({
								title:'错误',
								message:'数据保存失败',
								type:'error'
							});


						})
					}else{
						console.log("error submit");
						return false;
					}
				});
				


			},
			closeDialog(){
				// alert("111");
				// console.log('111');
				
				this.courseDialog.form={
					id:'',
					name:'',
					description:'',
					charge:''
				};

			},
			toEdit(row){
				this.courseDialog.title='修改课程';
				this.courseDialog.visible=true;
				this.courseDialog.form=row;


			},
			handleSelectionChange(val) {
		        this.selectIds=val;
		      },
		     toBatchDeleteCourse(){
		     	this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	let ids=this.selectIds.map((item)=>{
		        		return item.id;
		        	});
		        	this.batchDeleteCourses(ids).then(()=>{
		        		this.$notify({
		        			title:'成功',
		        			message:'批量删除成功',
		        			type:'success'
		        		});
		        		this.loadCourses();
		        	}).catch((error)=>{
		        		this.$notify({
		        			title:'错误',
		        			message:'批量删除失败',
		        			type:'error'
		        		});
		        	})
		          
		        }).catch(() => {
		            this.$notify({
		            	title:'错误',
		            	message:'取消删除',
		            	type:'error'
		            });    
		        });
		     },
		     toDeleteCourse(row){
		     	this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	
		        	this.deleteCourseById(row.id).then(()=>{
		        		this.$notify({
		        			title:'成功',
		        			message:'删除成功',
		        			type:'success'
		        		});
		        		this.loadCourses();
		        	}).catch((error)=>{
		        		this.$notify({
		        			title:'错误',
		        			message:'删除失败',
		        			type:'error'
		        		});
		        	})
		          
		        }).catch(() => {
		            this.$notify({
		            	title:'错误',
		            	message:'取消删除',
		            	type:'error'
		            });    
		        });
		     }

		}
	}
</script>


<style>
	
</style>