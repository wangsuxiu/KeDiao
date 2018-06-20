import Vue from 'vue'
import Router from 'vue-router'

import login from '@/pages/login'  //登录页
import index from '@/pages/index'

//实验室管理
import Base from '@/pages/base'
import BaseSchool from '@/pages/base/schoolInformation'
import BaseGrade from '@/pages/base/grade'
import BaseClazz from '@/pages/base/clazz'
import BaseCourse from '@/pages/base/course'
import BaseTeacher from '@/pages/base/teacher'
import QuestionBank from '@/pages/questionnaire/questionbank'
import List from '@/pages/questionnaire/list'
import CourseList from '@/pages/survey/list'
import Monitor from '@/pages/survey/monitor'
import Test from '@/pages/survey/test'



import Questionnaire from '@/pages/questionnaire'

import Survey from '@/pages/survey'

import Statistics from '@/pages/statistics'

import System from '@/pages/system'

Vue.use(Router)

export default new Router({
  routes:[{
    path: '/',
    name: 'login',
    component: login
  },{
    path: '/app',
    name: 'index',
    component: index,
    children:[{
      // 基础数据模块
      path: 'base',
      name: 'Base',
      component: Base,
      children:[{
        path: 'school',
        name: 'BaseSchool',
        component: BaseSchool
      },
      {
        path: 'grade',
        name: 'BaseGrade',
        component: BaseGrade
      },
      {
        path:'clazz',
        name:'BaseClazz',
        component:BaseClazz
      },
      {
        path:'course',
        name:'BaseCourse',
        component:BaseCourse
      },
      {
        path:'teacher',
        name:'BaseTeacher',
        component:BaseTeacher
      }

      ]
    },{
      path: 'questionnaire',
      name: 'Questionnaire',
      component: Questionnaire,
      children:[
        {
          path:'question',
          name:'questionbank',
          component:QuestionBank
        },
        {
          path:'list',
          name:'list',
          component:List
        }
      ]
    },{
      path: 'survey',
      name: 'Survey',
      component: Survey,
      children:[
        {
          path:'list',
          name:'List',
          component:CourseList
        },
        {
          path:'monitor',
          name:'Monitor',
          component:Monitor
        },
        {
          path:'test',
          name:'Test',
          component:Test
        }
      ]
    },{
      path: 'statistics',
      name: 'Statistics',
      component: Statistics,
    },{
      path: 'system',
      name: 'System',
      component: System,
    }]
  }]
})
