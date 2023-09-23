import BigMenuList from "@/components/BigMenuList"


function FridgeMenu () {
  return(
    <div className='h-[450px] flex justify-around flex-wrap flex-row overflow-y-scroll max-w-[820px] m-auto min-w-[320px]'>
      <BigMenuList></BigMenuList>
    </div>
  )
}

export default FridgeMenu