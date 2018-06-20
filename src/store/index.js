import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex);

//云实验室模块
import SchoolStore from './modules/base/schoolStore'
import GradeStore from './modules/base/gradeStore'
import CourseStore from './modules/base/courseStore'
import ClazzStore from './modules/base/clazzStore'
import QuestionStore from './modules/question/questionbank'


export default new Vuex.Store({
	modules:{
		SchoolStore,
		GradeStore,
		QuestionStore,
		CourseStore,
		ClazzStore
	}
});