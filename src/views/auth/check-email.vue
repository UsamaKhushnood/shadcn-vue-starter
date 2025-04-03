<template>
  <div class="flex flex-col gap-6">
    <Card>
      <CardHeader class="text-center">
        <CardTitle class="text-xl"> Check your email </CardTitle>
        <CardDescription>
          We sent a verification email link to <b>example@gmail.com</b>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Spinner class="mx-auto" />
        <Button size="lg" :loading="loading" class="mt-6 w-full text-lg" type="submit">
          Resend
        </Button>
        <p class="text-sm text-center mt-4">
          <router-link class="text-primary flex items-center justify-center gap-2" to="/login">
            <ArrowLeft class="size-4" /> Back to login
          </router-link>
        </p>
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
import { ArrowLeft } from 'lucide-vue-next'
export default {
  components: {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    ArrowLeft
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
