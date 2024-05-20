<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router'
import type { FormRules, FormInst } from 'naive-ui';
import { $t } from '@/i18n/i18n';

interface FormModel {
  username : string;
  password : string;
}

const model : FormModel = reactive({
  username: '',
  password: ''
})

const rules : FormRules = {
  username: [
    {
      required: true,
      message: $t('PLEASE_ENTER_USERNAME'),
      trigger: ['input', 'blur']
    }
  ],
  password: [
    {
      required: true,
      message: $t('PLEASE_ENTER_PASSWORD'),
      trigger: ['input', 'blur']
    }
  ],
}

const formRef = ref<FormInst | null>(null);
const router = useRouter();
function handleLogin() {
  formRef.value?.validate((errors) => {
    if (!errors) {
      console.log(model)
      router.push('/home');
    }
  }).catch((err)=> {
    console.log(err)
  })
}
</script>

<template>
  <div class="login bg-login relative w-full h-100vh flex justify-center items-center overflow-hidden pl-20px pr-20px">
    <div class="login-card bg-login-card max-w-login-card w-login-card h-login-card p-30px rd-4px">
      <div class="flex justify-center text-26px font-500 pb-30px">
        <h3>{{ $t('SYSTEM_NAME') }}</h3>
      </div>
      <n-form ref="formRef" :model="model" :rules="rules">
        <n-form-item path="username" :show-label="false">
          <n-input v-model:value="model.username" :placeholder="$t('PLEASE_ENTER_USERNAME')" />
        </n-form-item>
        <n-form-item path="password" :show-label="false">
          <n-input
            type="password"
            v-model:value="model.password" 
            :placeholder="$t('PLEASE_ENTER_PASSWORD')" 
          />
        </n-form-item>
      </n-form>
      <n-button type="primary" class="w-full mt-10px" @click="handleLogin">
        {{ $t('LOGIN') }}
      </n-button>
    </div>
  </div>
</template>

<style scoped>
</style>
