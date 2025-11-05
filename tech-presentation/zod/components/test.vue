<script setup>
import { z } from "zod";
import { ref, reactive } from "vue";

// 定義 UI metadata registry
const uiRegistry = z.registry();

// 定義登入表單 schema
const loginSchema = z.object({
  email: z.email().register(uiRegistry, {
    label: "Email",
    placeholder: "example@email.com",
    inputType: "email",
  }),

  password: z.string().min(8).register(uiRegistry, {
    label: "Password",
    placeholder: "At least 8 characters",
    inputType: "password",
  }),
});

// 表單資料
const formData = reactive({});

// 錯誤訊息
const errors = ref({});

// 提交表單
const handleSubmit = () => {
  errors.value = {};

  const result = loginSchema.safeParse(formData);

  if (result.success) {
    console.log("Data:", result.data);
  } else {
    console.log(`error: ${result.error.message}`);
  }
};

const fields = Object.entries(loginSchema.shape);
// 取得欄位清單
</script>

<template>
  <div class="demo-container">
    <form @submit.prevent="handleSubmit" class="demo-form">
      <div
        v-for="[fieldName, fieldSchema] in fields"
        :key="fieldName"
        class="field"
      >
        <label>{{ uiRegistry.get(fieldSchema)?.label }}</label>

        <input
          v-model="formData[fieldName]"
          :type="uiRegistry.get(fieldSchema)?.inputType || 'text'"
          :placeholder="uiRegistry.get(fieldSchema)?.placeholder"
          :class="{ error: errors[fieldName] }"
        />

        <p v-if="errors[fieldName]" class="error-msg">
          {{ errors[fieldName] }}
        </p>
      </div>
    </form>

    <div class="preview">
      <pre class="code-block">
const loginSchema = z.object({
  email: z.email().register(uiRegistry, {
    label: "Email",
    placeholder: "example@email.com",
    inputType: "email",
  }),

  password: z.string().min(8).register(uiRegistry, {
    label: "Password",
    placeholder: "At least 8 characters",
    inputType: "password",
  }),
});
          {{ errors[fieldName] }}
        </pre
      >
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
}

.demo-form {
  padding: 1rem;
}

.field {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 600;
  font-size: 0.9rem;
  color: #333;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: #4caf50;
}

input.error {
  border-color: #f44336;
}

.error-msg {
  margin-top: 0.25rem;
  font-size: 0.8rem;
  color: #f44336;
}

button {
  width: 100%;
  padding: 0.6rem;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: #45a049;
}

.preview {
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
}

.preview strong {
  margin-bottom: 0.5rem;
  color: #333;
}

.preview pre {
  margin: 0;
  padding: 0.75rem;
  background: #2d2d2d;
  color: #f8f8f2;
  border-radius: 4px;
  font-size: 0.85rem;
  overflow: auto;
  flex: 1;
}
.code-block {
  background: #0f172a;
  color: #93c5fd;
  padding: 0.4rem;
  border-radius: 4px;
  font-size: 0.7rem;
  border-left: 3px solid #3b82f6;
}
</style>
