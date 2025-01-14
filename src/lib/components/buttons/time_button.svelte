<script>
    export let time;
    console.log("Current DateTime:", time);
</script>

<button class="time_button">
    <p class="s1">
        {time}
    </p>
</button>

<style>

    .time_button {
        border-radius: 0px 0px 0px 5px;
        top: 0;
        right: 0;
        border-right: 0px;
        border-top: 0px;
    }

</style>