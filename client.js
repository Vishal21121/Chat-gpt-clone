let data;
document.getElementById('text').addEventListener('input',(e)=>{
    data = e.target.value;
})

async function setVal(){
    document.getElementById('container').innerHTML += `
    <div class="flex justify-start px-32 py-4 bg-gray-700 my-4">
    <span class="material-symbols-outlined text-white bg-blue-700 text-3xl block h-[36px]">person</span>
    <p class="text-white px-14">${data}</p>
    </div>
    `
    
    document.getElementById('container').scrollTop = document.getElementById('container').scrollHeight
    let response = await fetch('http://localhost:5000/api/text',{
        method:'POST',
        mode:'cors',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            "prompt":data
        })
        
    })
    // console.log(await response.json())   
    let val = await response.json()
    let botVal = val.data
    console.log(botVal)
    document.getElementById('container').innerHTML += `
    <div class="flex justify-start px-32 py-4 bg-gray-400 my-8">
        <span class="material-symbols-outlined text-3xl block h-[36px]">smart_toy</span>
        <div class="text-white px-14" id="botData" style="white-space: pre-line">${botVal}</div>
    </div>`
    document.getElementById('container').scrollTop = document.getElementById('container').scrollHeight
    document.getElementById('text').value = ''
}

document.getElementById('btn').addEventListener('click',async (e)=>{
    e.preventDefault()
    setVal()
})

window.addEventListener('keyup',(e)=>{
    if (e.key === 'Enter') {
        setVal()
    }
})

