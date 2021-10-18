<template>
    <div class="loader-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>

<script>
 export default {
     name: "Loader"
 }
</script>

<style scoped>
.loader-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.loader-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #39c;
  filter: invert(1);
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.loader-ellipsis div:nth-child(1) {
  left: 8px;
  background: #d00;
  animation: lds-ellipsis1 0.6s infinite;
}
.loader-ellipsis div:nth-child(2) {
  left: 8px;
  background: #0d0;
  animation: lds-ellipsis2 0.6s infinite;
}
.loader-ellipsis div:nth-child(3) {
  left: 32px;
  background: #00d;
  animation: lds-ellipsis2 0.6s infinite;
}
.loader-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
</style>