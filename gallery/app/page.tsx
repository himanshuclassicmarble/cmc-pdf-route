import Image from 'next/image'

const Page = () => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="relative h-64 w-full">
        <Image
          src="https://ypafaxfcutwjamwcaclp.supabase.co/storage/v1/object/public/natural-public/webp-crop-new/LO02372.webp"
          alt="Card image"
          layout="fill"
          objectFit="cover"
          priority={true}
          className="rounded-t-xl"
        />
      </div>
      <div className="p-6">
        <h2 className="font-bold text-xl mb-2">Card Title</h2>
        <p className="text-gray-700">
          This is the content of your card. You can add any description or details here.
        </p>
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Learn More
        </button>
      </div>
    </div>
  )
}

export default Page