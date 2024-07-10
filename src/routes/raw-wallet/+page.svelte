<script lang="ts">
    import { PrivateKey } from '@bsv/sdk'

    let WIF:string
    let address:string

    function createKeys () {

        const privKey = PrivateKey.fromRandom()
        WIF = privKey.toWif()
        console.log("Private Key WIF formate is ", WIF)
        address = privKey.toAddress()
        console.log("Your bitcoin address is ", address)
    }


</script>

<section>
    <button on:click={createKeys} class="bg-yellow-500 hover:bg-blue-700 text-white font-bold mt-5 ml-2 px-2 rounded " >Generate New Wallet Keys</button>
    <p>Private Key WIF formate is {WIF}</p>
    <p>Your Bitcoin Address is {address}</p>
</section>