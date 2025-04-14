<template>
  <div class="flex flex-col gap-6">

    <Card>
      <CardHeader class="text-center">
        <div class="rounded-full bg-green-600 w-fit mx-auto size-12">
          <Check class="mx-auto size-8 p-2 box-content text-background mb-4" />
        </div>
        <CardTitle class="text-xl"> Password reset </CardTitle>
        <CardDescription>
          Your password has been successfully reset. Click below to log in magically.
        </CardDescription>
      </CardHeader>

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
import { ArrowLeft, Check } from 'lucide-vue-next'
export default {
  components: {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    ArrowLeft, Check
  },
  data() {
    return {
      loading: false,
      form: {
        password: '',
        password_cofirmation: '',
      },
      schema: {
        password: { required: helpers.withMessage('Password is required', required) },
        password_cofirmation: { required: helpers.withMessage('Confirm Password is required', required) }
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