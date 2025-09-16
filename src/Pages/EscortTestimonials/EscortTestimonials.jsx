import React from 'react'

const EscortTestimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "James",
      feedback: "Amazing experience, very professional and kind. Definitely recommend!",
      date: "Sept 14, 2025",
    },
    {
      id: 2,
      name: "Michael",
      feedback: "She made me feel so comfortable. One of the best nights I've had.",
      date: "Sept 11, 2025",
    },
    {
      id: 3,
      name: "Daniel",
      feedback: "Great service and attention to detail. I’ll surely book again.",
      date: "Sept 9, 2025",
    },
  ]

  return (
    <div className="bg-pink-100 p-6 h-screen">
      <h2 className="text-2xl font-bold text-pink-500 mb-6">Escort Testimonials</h2>
      <div className="space-y-6">
        {testimonials.map(testimonial => (
          <div key={testimonial.id} className="bg-white p-4 shadow-md">
            <p className="text-gray-700 italic">"{testimonial.feedback}"</p>
            <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
              <span>- {testimonial.name}</span>
              <span>{testimonial.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EscortTestimonials
