<template>
	<div class="grade">
		<el-row class="topBtns">
			<el-col :span="12">
				<el-input style="width:220px;" placeholder="请输入关键字" suffix-icon="el-icon-search"></el-input>
			</el-col>
			<el-col :span="12" class="content-right">
				<el-button @click="toaddList">添加</el-button>
				<el-button>批量删除</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-table
				    ref="multipleTable"
				    :data="getList"
				    tooltip-effect="dark"
				    style="width: 100%;text-align:center"
				    @selection-change="handleSelectionChange"
					border
					size="mini"
				    >
				    <el-table-column
				      type="selection"
				      prop="id"
				      width="55">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="问卷名称"
				      width="650"
				      >
				     
				    </el-table-column>
				    <el-table-column
				      prop="time"
				      label="创建时间"
				      width="150"
				      >
				    </el-table-column>
				    <el-table-column
				      label="操作"
				      show-overflow-tooltip>
				      <template slot-scope="scope">
				      	<el-button type="text" @click="toViewList(scope.row)">预览</el-button>
				      	<el-button type="text" @click="toEditList(scope.row)">修改</el-button>
						<el-button type="text" @click="toDeleteList(scope.row)">删除</el-button>
				      </template>
				    </el-table-column>
				  </el-table>

			</el-col>
		</el-row>
			<!-- 创建试卷模态框 -->
			<el-dialog :title="listDialog.title" :visible.sync="listDialog.visibile" @close="closeDialog" fullscreen>
			{{listDialog.form}}
			  <el-form :model="listDialog.form" label-width="100px" size="small" :rules="rules" ref="listDialogForm">
			    <el-form-item label="问卷名称" prop="name" v-if="getShow" >
			      <el-input v-model="listDialog.form.name" auto-complete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="题目列表"  v-if="getShow">
			      <el-button @click="selectQuestion">点击选择</el-button>
			    </el-form-item>
			  </el-form>
			  <el-row v-for="item in listDialog.form.questions" class="btns" :key="item.id">
				<el-col :span="24">
				<el-card class="box-card">
				  <div slot="header" class="clearfix">
				    <span>{{item.id}}:  {{item.name}}</span> 
				  </div>
				  <div class="text item" v-for="data in item.options">
				    {{data.label}}: {{data.content}}
				  </div>
				 
				  	<i class="el-icon-edit-outline" @click="toEdit(item)" style="font-size:3em;position:absolute;right:1em;bottom:.2em"></i>
				  
				</el-card>
			</el-col>
			</el-row>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="listDialog.visibile = false">取 消</el-button>
			    <el-button type="primary" @click="addlist">确 定</el-button>
			  </div>
			</el-dialog>
		<!-- 添加问题模态框 -->
			<el-dialog :title="questionDialog.title" :visible.sync="questionDialog.visibile">
				<el-transfer 
					 style="text-align: left; display: inline-block"
				      v-model="value3"
				   
				      :left-default-checked="[2, 3]"
				      :right-default-checked="[1]"
				      :render-content="renderFunc"
				      :titles="['Source', 'Target']"
				      :format="{
				        noChecked: '${total}',
				        hasChecked: '${checked}/${total}'
				      }"
				      @change="handleChange"
				      :data="data"
				>
					
				</el-transfer>
			</el-dialog>

			

	</div>
</template>


<script>
	export default{
		data(){
			 
			return{

				listDialog:{
					visibile:false,
					title:'',
					form:{
						id:'',
						name:'',
						time:'',
						questions:[
							{
								id:1,
								name:'老师在上课前是否进行了充分的准备?',
								options:[
									{
										id:1,
										label:'A',
										content:'优秀',
										score:5
									},
									{
										id:2,
										label:'B',
										content:'良好',
										score:4
									},
									{
										id:3,
										label:'C',
										content:'一般',
										score:3
									},
									{
										id:4,
										label:'D',
										content:'较差',
										score:2
									},
								]
							}
						]
					}
				},
				rules:{
					name:[
					{required:true,message:'请输入问卷名称',trigger:'blur'}
					],
					
				},
				questionDialog:{
					title:'',
					visibile:false,
					form:{

					}
				},

			}

		},
		computed:{
			getList(){
				return [{id:1,name:'杰普软件主讲老师课调问卷',time:'2015-06',questions:[
					{
						id:1,
						name:'老师在上课前是否进行了充分的准备?',
						options:[
							{
								id:1,
								label:'A',
								content:'优秀',
								score:5
							},
							{
								id:2,
								label:'B',
								content:'良好',
								score:4
							},
							{
								id:3,
								label:'C',
								content:'一般',
								score:3
							},
							{
								id:2,
								label:'D',
								content:'较差',
								score:2
							}
						]
					}
				]},

				{id:2,name:'杰普软件辅导老师课调问卷',time:'2017-08',questions:[
				{
					id:1,
					name:'老师讲课的内容是否能够接受?',
					options:[
						{
							id:1,
							label:'A',
							content:'优秀',
							score:5
						},
						{
							id:2,
							label:'B',
							content:'良好',
							score:4
						},
						{
							id:3,
							label:'C',
							content:'一般',
							score:3
						},
						{
							id:2,
							label:'D',
							content:'较差',
							score:2
						}
					]
				}

				]}];
			},
			getShow(){
				if(this.listDialog.title=='创建问卷'||this.listDialog.title=='修改问卷'){
					return true;
				}else{
					return false;
				}
			}
		},
		methods:{
			handleSelectionChange(val) {
		        this.multipleSelection = val;
		      },
		    toEditList(row){
		    	this.listDialog.title="修改问卷";
		    	this.listDialog.form=row;
		    	this.listDialog.visibile=true;
		    },
		    toaddList(){
		    	
		    	this.listDialog.title="创建问卷";
		    	this.listDialog.visibile=true;
		    	// console.log(this.gradeDialog.visibile);
		    },
		   
		   addlist(){
		   
		   		//1.对用户输入的数据进行校验
		   		//2.如果校验成功，获得数据，提交数据
		   		//3.清空模态框中的额数据
		   		//4.关闭模态框
		   		 this.$refs['listDialogForm'].validate((valid) => {
		          if (valid) {
		          	let list=this.listDialog.form;
		            console.log("成功",list);
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		   		
		   		this.listDialog.visibile=false;
		   		
		   },
		   closeDialog(){

		   	this.$refs['listDialogForm'].resetFields();
		   	// 清空数据
		   	this.listDialog.form={
		   		id:'',
		   		name:'',
		   		time:'',
		   		questions:[]
		   	}
		   	
		   },
		   // handlerClose(done){
		   // 	alert("aaa");
		   // 	done();
		   // }
		   selectQuestion(){
		   	this.questionDialog.title='选择题目',
		   	this.questionDialog.visibile=true;
		   },
		   toViewList(row){
		   	this.listDialog.title=row.name;
		   	this.listDialog.visibile=true;
		   	this.listDialog.form.questions=row.questions;
		   },


		}
	}
</script>


<style scoped>
	.topBtns{
		margin-bottom: .5em;
	}
</style>