<template>
  <div id="app">
    <h2 style="text-align: center">Contract ABI 转换</h2>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="auto"
    >
      <el-form-item label="from" prop="from">
        <el-input type="textarea" v-model="ruleForm.from" :rows="10"></el-input>
      </el-form-item>
      <el-form-item label="to" prop="to">
        <el-input type="textarea" v-model="to" :rows="10" :autosize="{ minRows: 10, maxRows: 20 }" readonly></el-input>
      </el-form-item>
    </el-form> 
  </div>
</template>

<script>
import { utils } from 'ethers'
export default {
  name: 'App',
  components: {},
  data() {
    return {
      ruleForm: {
        from: '',
        to: '',
      },
      rules: {
        abi: [
          { required: true, message: '请输入abi', trigger: 'blur' },
        ],
        methodsName: [
          { required: true, message: '请输入方法名', trigger: 'blur' }
        ],
        txData: [
          { required: true, message: '请输入txData', trigger: 'blur' }
        ],
      },
    }
  },
  computed: {
    to() {
      try {
        if (this.ruleForm.from) {
          let from = JSON.parse(this.ruleForm.from)
          if (Array.isArray(from)) {
            const Interface = new utils.Interface(from)
            if (typeof from[0] === 'string') {
              return Interface.format(utils.FormatTypes.json)
            } else if (typeof from[0] === 'object') {
              return JSON.stringify(Interface.format(utils.FormatTypes.full), null, 2)
            }
          }
        }
      } catch (err) {
        console.log(err)
        return ''
      }
      return ''
    }
  },
  methods: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  padding: 0 20px 20px 20px;
}
</style>
