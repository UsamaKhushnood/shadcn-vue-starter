<template>
  <div class="flex flex-col gap-6">
    <Card>
      <CardHeader class="text-center">
        <CardTitle class="text-xl"> Welcome back </CardTitle>
        <CardDescription>

        </CardDescription>
      </CardHeader>
      <CardContent>

        <CForm :initialValues="form" :onSubmit="Login" :schema="schema">
          <div class="grid gap-6">
            <div class="grid gap-2">
              <CField label="Email" name="email">
                <CInput v-model="form.email" placeholder="Enter your email address" type="text" />
              </CField>
              <CField label="Password" name="password">
                <PasswordInput v-model="form.password" placeholder="Enter password" />
                <div class="text-right mt-1">
                  <router-link class="ml-auto text-xs text-primary" to="/forgot-password">
                    Forgot password
                  </router-link>
                </div>
              </CField>
              <Button size="lg" :loading="loading" class="mt-6 w-full text-lg" type="submit">
                Login
              </Button>
            </div>
          </div>
        </CForm>
      </CardContent>
    </Card>
    <div
      class="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
      By clicking continue, you agree to our
      <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
    </div>
  </div>
</template>
<script>
import { mapActions } from 'pinia'
import { useAuthStore } from '@/stores'
import { helpers, required, email } from '@vuelidate/validators'
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import CForm from '@/components/common/form/CForm'
// import CInput from '@/components/common/form/CInput'
// import PasswordInput from '@/components/common/form/PasswordInput'

export default {
  components: {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Input,
    Label,
    // CForm,
    // CInput,
    // PasswordInput
  },
  data() {
    return {
      loading: false,
      form: {
        email: '',
        password: ''
      },
      schema: {
        email: {
          email: helpers.withMessage('Type a valid email', email),
          required: helpers.withMessage('Email is required', required)
        },
        password: { required: helpers.withMessage('Password is required', required) }
      }
    }
  },
  methods: {
    ...mapActions(useAuthStore, { login: 'login' }),
    Login() {
      this.loading = true
      this.login(this.form).finally(() => {
        this.loading = false
      })
    }
  }

}

</script>
