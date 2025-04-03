<template>
  <div class="container mt-40">
    <div class="w-lg max-w-lg shadow-xl rounded-xl p-10 mx-auto">
      <div class="rounded-full bg-green-600 w-fit mx-auto">
        <Mail class="mx-auto size-8 p-2 box-content text-background mb-4" />
      </div>
      <h3 class="text-3xl font-semibold text-center">Check your email</h3>
      <p class="text-center text-sm mt-2">We sent a password reset link to olivia@gmail.com </p>

      <div class="justify-center flex mt-8">
        <PinInput id="pin-input" v-model="pin" placeholder="-">
          <PinInputGroup>
            <PinInputInput v-for="(id, index) in 4" :key="id" :index="index" class="uppercase" />
          </PinInputGroup>
        </PinInput>
      </div>

      <Button class="mt-6 w-full">Continue</Button>

      <p class="text-sm text-center mt-2">
        <span class="font-normal mr-1">Didn’t receive the email?</span>
        <router-link to="/login" class="text-primary"> Click to resend </router-link>
      </p>

      <p class="text-sm text-center mt-10">
        <router-link class="text-primary flex items-center justify-center gap-2" to="/login">
          <ArrowLeft class="size-4" /> Back to login
        </router-link>
      </p>

    </div>
  </div>

</template>
<script>
import {
  PinInput,
  PinInputGroup,
  PinInputInput,
} from '@/components/ui/pin-input'
import { ArrowLeft, Mail } from 'lucide-vue-next'
export default {
  components: { Mail, ArrowLeft },
  data() {
    return {
      pin: []
    }
  }
}
</script>
