<template>
	<div class="monitor">
		<el-row class="topBtns">
			<el-col :span="12">
				<el-input style="width:220px;" placeholder="请输入关键字" suffix-icon="el-icon-search"></el-input>
			</el-col>
			<el-col :span="12" class="content-right">
				<el-button @click="toaddmonitor">添加</el-button>
				<el-button>批量删除</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-table
				    ref="multipleTable"
				    :data="getMonitorList"
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
				      prop="number"
				      label="课调编号"
				      >
				    </el-table-column>
				    <el-table-column
				      label="操作"
				      show-overflow-tooltip>
				      <template slot-scope="scope">
				      	<el-button type="text" @click="toEditGrade(scope.row)">开启</el-button>
				      	<el-button type="text" @click="toEditGrade(scope.row)">查看进度</el-button>
						<el-button type="text" @click="toDeleteGrade(scope.row)">结束</el-button>
				      </template>
				    </el-table-column>
				  </el-table>

			</el-col>
		</el-row>
			
			<el-dialog :title="gradeDialog.title" :visible.sync="gradeDialog.visibile" @close="closeDialog">
			{{gradeDialog.form}}
			  <el-form :model="gradeDialog.form" label-width="100px" size="small" :rules="rules" ref="gradeDialogForm">
			    <el-form-item label="年级名称" prop="name">
			      <el-input v-model="gradeDialog.form.name" auto-complete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="年级简介" prop="description">
			      <el-input type="textarea" v-model="gradeDialog.form.description"></el-input>
			    </el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="gradeDialog.visibile = false">取 消</el-button>
			    <el-button type="primary" @click="addGrade">确 定</el-button>
			  </div>
			</el-dialog>
		

			

	</div>
</template>


<script>
	export default{
		data(){
			return{
				gradeDialog:{
					visibile:false,
					title:'',
					form:{
						id:'',
						name:'',
						description:''
					}
				},
				rules:{
					name:[
					{required:true,message:'请输入年级名称',trigger:'blur'}
					],
					description:[
						{required:true,message:'请输入年级简介',trigger:'blur'}
					]
				}
			}
		},
		computed:{
			getGradeList(){
				return [{id:1,name:'webui',description:'啦啦啦'},{id:2,name:'javaee',description:'呜呜呜'}];
			}
		},
		methods:{
			handleSelectionChange(val) {
		        this.multipleSelection = val;
		      },
		    toEditGrade(row){
		    	this.gradeDialog.title="修改年级";
		    	this.gradeDialog.form=row;
		    	this.gradeDialog.visibile=true;
		    },
		    toaddGrade(){
		    	
		    	this.gradeDialog.title="添加年级";
		    	this.gradeDialog.visibile=true;
		    	console.log(this.gradeDialog.visibile);
		    },
		    toDeleteGrade(row){
		    	console.log("delete",row);
		    },
		   addGrade(){
		   
		   		//1.对用户输入的数据进行校验
		   		//2.如果校验成功，获得数据，提交数据
		   		//3.清空模态框中的额数据
		   		//4.关闭模态框
		   		 this.$refs['gradeDialogForm'].validate((valid) => {
		          if (valid) {
		          	let grade=this.gradeDialog.form;
		            console.log("成功",grade);
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		   		
		   		this.gradeDialog.visibile=false;
		   		
		   },
		   closeDialog(){

		   	this.$refs['gradeDialogForm'].resetFields();
		   	this.gradeDialog.form={
		   		id:'',
		   		name:'',
		   		description:''
		   	}
		   },
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
</style>