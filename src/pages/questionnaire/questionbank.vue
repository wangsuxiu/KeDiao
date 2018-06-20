<template>
	<div class="questionnaire">
		<el-row class="btns">
			<el-col :span="12">
				<el-input placeholder="请输入您想搜索的内容" style="width:220px"></el-input>

			</el-col>
			<el-col :span="12" class="content-right">
				<el-button @click="toaddQuestion">添加</el-button>
				<el-button>批量删除</el-button>
			</el-col>
		</el-row>
		{{questionList}}
		<div class="content" :style="questionListStyle" v-loading="questionLoading">
			<el-row v-for="(item,index) in getQuestion" class="btns" :key="item.id">
			<el-col :span="24">
				<el-card class="box-card">
				  <div slot="header" class="clearfix">
				  	<el-checkbox v-model="questionList" :label="item.id"></el-checkbox>
				    <span>{{index+1}}:  {{item.title}}</span> 
				  </div>
				  <div class="text item" v-for="data in item.options">
				    {{data.label}}: {{data.content}}
				  </div>
				 
				  	<i class="el-icon-edit-outline" @click="toEdit(item)" style="font-size:2em;position:absolute;right:1.5em;bottom:.2em"></i>
				  	<i class="el-icon-delete" @click="toDeleteQuestion(item.id)" style="font-size:2em;position:absolute;right:.5em;bottom:.2em"></i>
				</el-card>
			</el-col>
		</el-row>
		</div>
		

		<!-- 模态框 -->
		<el-dialog :title="questionDialog.title" :visible.sync="questionDialog.visible" @close="closeDialog">
		{{questionDialog.form}} <br>
		{{questionDialog.options}} <br>
		{{questionDialog.form.questionTypes}}
		  <el-form :model="questionDialog.form" label-width='100px' :rules="rules" ref="questionDialogForm">
		    <el-form-item label="题目名称" prop="title">
		      <el-input v-model="questionDialog.form.title"></el-input>
		    </el-form-item>
		    <el-row>
		    	<el-col :span="12">
		    		<el-form-item label="题目类型" prop="questionTypes">
		    			<el-select style="width:100%" v-model="questionDialog.form.questionTypes" value-key="id">
		    				<el-option v-for="item in questionTypes" :label="item.questionTypeLabel" :value="item" :key="item.id"></el-option>
		    			</el-select>
		    		</el-form-item>
		    	</el-col>
		    	<el-col :span="12">
		    		<el-form-item label="所属课程" prop="couseId">
		    			<el-select style="width:100%" v-model="questionDialog.form.couseId">
		    				<el-option v-for="item in courseTypes" :label="item.name" :value="item.id" :key="item.id"></el-option>
		    			</el-select>
		    		</el-form-item>
		    	</el-col>
		    </el-row>
		    <el-form-item label="题目选项" >
		      <el-table border :data="questionDialog.options" size="mini" v-if="this.questionDialog.form.questionTypes&&this.questionDialog.form.questionTypes.id!=3">
		      	<el-table-column  label='序号' align="center">
		      		<template slot-scope="scope">
		      			{{scope.$index+1}}
		      		</template>
		      	</el-table-column>
		      	<el-table-column label='label' align="center">
		      		<template slot-scope="scope">
		      			{{scope.row.label}}
		      		</template>
		      	</el-table-column>
		      	<el-table-column label='选项' align="center">
		      		<template slot-scope="scope">
		      			<el-input v-model="scope.row.content" style="width:100%"></el-input>
		      		</template>
		      	</el-table-column>
		      	<el-table-column  prop="score" label='分值' align="center">
		      		<template slot-scope="scope">
		      			<el-input v-model="scope.row.score" style="width:100%"></el-input>
		      		</template>
		      	</el-table-column>
		      	<el-table-column  label='操作' align="center">
		      		<template slot-scope="scope">
		      			<el-button type="text" @click="deleteOption(scope.row)">删除</el-button>
		      		</template>
		      	</el-table-column>
		      </el-table>

		    </el-form-item>
		    <el-form-item>
		    	 <i class="el-icon-circle-plus-outline" style="font-size:2em;position:absolute;right:0" @click="addOption"></i>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="questionDialog.visible= false">取 消</el-button>
		    <el-button type="primary" @click="addQuestion">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>


<script>
	import {mapGetters,mapActions} from 'vuex'
	export default{
		data(){
			return {
				questionDialog:{
					visible:false,
					title:'',
					form:{
						id:'',
						title:'',
						questionTypes:null,
						couseId:''
					},
					options:[]
				},
				questionList:[],
				questionTypes:[],
				courseTypes:[],
				questionListHeight:400,
				rules:{
					
					title:[{required:true,message:'请输入题目名称',trigger:'blur'}],
					questionTypes:[{required:true,message:'请输入题目类型',trigger:'change'}],
					couseId:[{required:true,message:'请选择所属课程',trigger:'change'}],
				},
				questionLoading:false
			}
		},
		computed:{
			...mapGetters(['getQuestion']),
			questionListStyle(){
				return{
					'height':this.questionListHeight+'px',
					'overflow-y':'auto'
				}
			}

		},
		watch:{
			'questionDialog.options':{
				handler:function(now,old){
					for(var index in now){
						var o=now[index];
						switch(+index){
							case 0:
							o.label='A';
							break;
							case 1:
							o.label='B';
							break;
							case 2:
							o.label='C';
							break;
							case 3:
							o.label='D';
							break;
							case 4:
							o.label='E';
							break;
						}
					}
				}
			}
		},
		created(){
			
			this.questionListHeight=$(window).height()-200;
			this.loadQuestions();
		},
		methods:{
			...mapActions(['findQuestions','findQuestionTypes','findCourses','saveOrUpdateQuestion','deleteQuestionById']),
			loadQuestions(){
				this.questionLoading=true;
				this.findQuestions().finally(()=>{
					this.questionLoading=false;

				}).catch((error)=>{
					this.$notify({
						title:"错误",
						message:'数据加载异常',
						type:'success'
					})
				});
			},
			toEdit(row){
				this.questionDialog.title="修改题目信息";
				this.questionDialog.visible=true;
				this.questionDialog.form=row;

			},
			closeDialog(){
				this.$refs['questionDialogForm'].resetFields();
				
			},
			toaddQuestion(){
				this.questionDialog.title="添加题目";
				this.questionDialog.visible=true;
				this.findQuestionTypes().then((result)=>{
					this.questionTypes=result.data;
				});
				this.findCourses().then((result)=>{
					this.courseTypes=result;
					
				})

			},
			addQuestion(){
				//1.对用户输入的信息进行校验
				//2.如果校验成功，则提交数据
				//3.关闭模态框
				this.$refs['questionDialogForm'].validate((valid)=>{
					if(valid){
						// 不是简答题的话，选项至少为3个
						if(this.questionDialog.form.questionTypes.id!=3&&this.questionDialog.options.length<3){
							this.$notify({
								title:'错误',
								message:'选项至少为3个',
								type:'error'
							})
						}else{
							let form=this.questionDialog.form;
							let question={
								id:form.id,
								title:form.title,
								questiontypeid:form.questionTypes.id,
								questiontypelabel:form.questionTypes.questionTypeLabel,
								course:{
									id:form.couseId
								},
								options:this.questionDialog.options

							};
							this.saveOrUpdateQuestion(question).then(()=>{
								this.questionDialog.visible=false;
								this.$notify({
									title:'成功',
									message:"数据保存成功",
									type:'success'
								});
								this.loadQuestions();
							}).catch(()=>{
								this.$notify({
									title:'失败',
									message:'数据保存失败',
									type:'error'
								})
							})
						}
						
					}else{
						console.log('error submit');
						return false;
					}
				});
				

			},
			addOption(){
				let option={
					label:'',
					content:'',
					score:0
				};
				this.questionDialog.options.push(option);
			},
			deleteOption(option){

				_.remove(this.questionDialog.options,(item)=>{
					return item === option;
				});
				console.log(JSON.stringify(this.questionDialog.options));
				this.questionDialog.options.push({});
				this.questionDialog.options.pop();
				
			},
			toDeleteQuestion(id){
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
          		type: 'warning'
        }).then(() => {
        	// 2. 确定删除，调用store中的函数，删除
        	this.deleteQuestionById(id).then((result)=>{
          	this.$notify({type: 'success', message: result.message});
          	//3. 刷新列表
          	this.loadQuestions();
        	}).catch((error)=>{
          	this.$notify({type: 'error', message:error.message });
        	});
        })
			},


		}
	}
</script>

<style>
	.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
  .btns{
  	margin-bottom:1em;
  }
  .box-card{
  	width:100%;
  }
  .el-table th, .el-table td{
  	padding:0px 0;
  }
</style>