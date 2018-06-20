<template>
	<div class="survey">
		<el-row class="topBtns">
			<el-col :span="12">
				<el-input style="width:220px;"></el-input>
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
				      prop="grade"
				      label="年级"
				      >
				     
				    </el-table-column>
				    <el-table-column
				      prop="clazz"
				      label="班级"
				      >
				    </el-table-column>
				    <el-table-column
				      prop="course"
				      label="课程"
				      >
				    </el-table-column>
				     <el-table-column
				      prop="questionnaire"
				      label="问卷"
				      >
				    </el-table-column>
				    <el-table-column
				      prop="teacher"
				      label="讲师"
				      >
				    </el-table-column>
				    <el-table-column
				      prop="time"
				      label="课调时间"
				      >
				    </el-table-column>
				    <el-table-column
				      label="操作"
				      show-overflow-tooltip>
				      <template slot-scope="scope">
				      <el-button type="text" @click="toViewList(scope.row)">预览</el-button>
				      	<el-button type="text" @click="toEditList(scope.row)">修改</el-button>
						<el-button type="text" @click="toDeleteGrade(scope.row)">删除</el-button>
				      </template>
				    </el-table-column>
				  </el-table>

			</el-col>
		</el-row>
			<!-- 添加/修改 模态框 -->
			<el-dialog :title="listDialog.title" :visible.sync="listDialog.visibile" @close="closeDialog">
			{{listDialog.form}}
			  <el-form :model="listDialog.form" label-width="100px" size="small" :rules="rules" ref="listDialogForm">
			    <el-form-item label="年级" prop="name">
			      <el-select v-model="listDialog.form.grade" auto-complete="off"></el-select>
			    </el-form-item>
			    <el-form-item label="班级" >
			     <el-select v-model="listDialog.form.clazz" auto-complete="off"></el-select>
			    </el-form-item>
			    <el-form-item label="课程" >
			      <el-select v-model="listDialog.form.course" auto-complete="off"></el-select>
			    </el-form-item>
			    <el-form-item label="问卷" >
			      <el-select v-model="listDialog.form.questionnaire" auto-complete="off"></el-select>
			    </el-form-item>
			    <el-form-item label="讲师" >
			      <el-select v-model="listDialog.form.teacher" auto-complete="off"></el-select>
			    </el-form-item>
			    <el-form-item label="开启" >
			       <el-checkbox>创建完成后开启课调</el-checkbox>
			    </el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="listDialog.visibile = false">取 消</el-button>
			    <el-button type="primary" @click="addList">确 定</el-button>
			  </div>
			</el-dialog>
		

			<!-- 预览模态框 -->
			<el-dialog :title="viewDialog.title" :visible.sync="viewDialog.visibile" fullscreen class="dialog">
				<div class="header">
					<ul>
						<li>班级:{{viewDialog.form.clazz}}</li>
						<li>讲师:{{viewDialog.form.teacher}}</li>
						<li>时间:{{viewDialog.form.time}}</li>
						<li>课程:{{viewDialog.form.course}}</li>
					</ul>
				</div>
				<div class="content">
					
				</div>
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
						grade:'',
						clazz:'',
						course:'',
						questionnaire:'',
						teacher:'',
						time:''
					}
				},
				rules:{
					name:[
					{required:true,message:'请输入年级名称',trigger:'blur'}
					],
					description:[
						{required:true,message:'请输入年级简介',trigger:'blur'}
					]
				},
				viewDialog:{
					visibile:false,
					title:'',
					form:{
						id:'',
						grade:'',
						clazz:'',
						course:'',
						questionnaire:'',
						teacher:'',
						time:'',
					}
				}
			}
		},
		computed:{
			getList(){
				return [{id:1,grade:'WebUI',clazz:'web1801',course:'ES6',questionnaire:'杰普软件主讲老师课调',teacher:'苟奋',time:'2018-07-01'},{id:2,grade:'javaee',clazz:'jd1801',course:'corejava',questionnaire:'杰普软件辅导老师课调',teacher:'张良',time:'2018-07-01'}];
			}
		},
		methods:{
			handleSelectionChange(val) {
		        this.multipleSelection = val;
		      },
		    toEditList(row){
		    	this.listDialog.title="修改课调";
		    	this.listDialog.form=row;
		    	this.listDialog.visibile=true;
		    },
		    toaddList(){
		    	
		    	this.listDialog.title="添加课调信息";
		    	this.listDialog.visibile=true;
		    },
		    toDeleteGrade(row){
		    	console.log("delete",row);
		    },
		   addList(){
		   
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
		   	this.listDialog.form={
		   		id:'',
				grade:'',
				clazz:'',
				course:'',
				questionnaire:'',
				teacher:'',
				time:''
		   	}
		   },
		   toViewList(row){

		   		this.viewDialog.form=row;
		   		this.viewDialog.title=row.questionnaire;
		   		this.viewDialog.visibile=true;
		   }
		   // handlerClose(done){
		   // 	alert("aaa");
		   // 	done();
		   // }

		}
	}
</script>


<style scoped>
	.topBtns{
		margin-bottom: .5em;
	}
	
	ul{
		padding:0;
		margin:0;
		list-style: none;
		text-align:center;
		margin-top:-10px;
		margin-left:-20px;
		margin-right:-20px;
	}
	ul>li{
		float:left;
		width:25%;
		height:80px;
		border-right: 1px solid black;
		border-bottom:1px solid black;
		line-height:80px;
	}
	
</style>
