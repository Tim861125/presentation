<template>
  <div class="zod-demo">
    <div class="demo-container">
      <!-- Input -->
      <div class="input-section">
        <h3 class="section-title">User Input</h3>
        <div class="form-group">
          <label>Name:</label>
          <input v-model="name" placeholder="Enter name" class="input-field" />
        </div>
        <div class="form-group">
          <label>Age:</label>
          <input v-model="age" placeholder="Enter age" class="input-field" />
        </div>
        <div class="button-group">
          <button @click="setValidData" class="btn btn-secondary">Valid</button>
          <button @click="setInvalidData" class="btn btn-secondary">
            Invalid
          </button>
          <button @click="clearForm" class="btn btn-secondary">Clear</button>
        </div>
      </div>

      <!-- Validation -->
      <div class="validation-section">
        <div class="button-group">
          <button @click="validateWithoutZod" class="btn btn-danger">
            No Zod
          </button>
          <button @click="validateWithZodSafeParse" class="btn btn-success">
            Zod safeParse
          </button>
          <button @click="validateWithZodParse" class="btn btn-info">
            Zod parse
          </button>
        </div>
      </div>
    </div>

    <div class="schema-display">
      <h3 class="section-title">Schema</h3>
      <pre class="code-block">
const UserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number()
    .min(0, "Age must be positive")
    .max(150, "Age must be realistic"),
});</pre
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { z } from "zod";

const UserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z
    .number()
    .min(0, "Age must be positive")
    .max(150, "Age must be realistic"),
});

const name = ref("");
const age = ref("");

const validationResult = ref<{
  success: boolean;
  error?: string;
  data?: any;
  errors?: Array<{ path: string; message: string }>;
} | null>(null);

const validateWithoutZod = () => {
  try {
    const data = {
      name: name.value,
      age: age.value ? Number(age.value) : age.value,
    } as {
      name: string;
      age: number;
    };
    validationResult.value = {
      success: true,
      data,
    };
    console.log(`name: ${data.name}\n age: ${data.age}`);
  } catch (error: any) {
    console.error("❌ Without Zod - Error:", error.message);
    validationResult.value = { success: false };
  }
};

const validateWithZodSafeParse = () => {
  const inputData = {
    name: name.value,
    age: age.value ? Number(age.value) : age.value,
  };
  const result = UserSchema.safeParse(inputData);
  console.log(result.error?.message);
};

const validateWithZodParse = () => {
  const inputData = {
    name: name.value,
    age: age.value ? Number(age.value) : age.value,
  };
  const result = UserSchema.parse(inputData);
  console.log(result);
};

const clearForm = () => {
  name.value = "";
  age.value = "";
};
const setInvalidData = () => {
  name.value = "";
  age.value = "-5";
};
const setValidData = () => {
  name.value = "John Doe";
  age.value = "25";
};
</script>

<style scoped>
.zod-demo {
  padding: 0.6rem;
  background: radial-gradient(circle at 20% 30%, #1a1c2e 0%, #0c0d15 100%);
  border-radius: 10px;
  color: #e0e0ff;
  font-family: "JetBrains Mono", monospace;
  font-size: 0.7rem;
  overflow: hidden;
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}

.zod-demo::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 20px 20px;
  z-index: 0;
}

.demo-container {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 0.5rem;
  z-index: 1;
}

.section-title {
  font-size: 0.8rem;
  color: #4ade80;
  margin-bottom: 0.3rem;
  text-shadow: 0 0 4px #22c55e;
}

.input-section,
.validation-section {
  background: rgba(30, 41, 59, 0.6);
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid rgba(147, 197, 253, 0.15);
  height: 190px;
}

.form-group {
  margin-bottom: 0.4rem;
}

label {
  display: block;
  font-size: 0.65rem;
  color: #a5b4fc;
  margin-bottom: 0.2rem;
}

.input-field {
  width: 100%;
  padding: 0.3rem 0.4rem;
  background: rgba(17, 24, 39, 0.7);
  border: 1px solid rgba(147, 197, 253, 0.2);
  border-radius: 4px;
  color: #e0e0ff;
  font-size: 0.7rem;
}

.input-field:focus {
  border-color: #38bdf8;
  box-shadow: 0 0 5px #0ea5e9;
  outline: none;
}

.button-group {
  display: flex;
  gap: 0.3rem;
  flex-wrap: wrap;
  margin-top: 0.4rem;
}

.btn {
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.65rem;
  transition: all 0.25s ease;
  cursor: pointer;
  font-weight: 600;
}

.btn-secondary {
  background: linear-gradient(135deg, #334155, #1e293b);
  color: #cbd5e1;
}

.btn-success {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: #e0ffe0;
}

.btn-danger {
  background: linear-gradient(135deg, #ef4444, #b91c1c);
  color: #ffe4e6;
}

.btn-info {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: #dbeafe;
}

.schema-display {
  margin-top: 0.4rem;
  background: rgba(30, 41, 59, 0.6);
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid rgba(147, 197, 253, 0.2);
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
