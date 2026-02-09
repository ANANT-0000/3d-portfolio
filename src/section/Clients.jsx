import React from 'react'
import { clientReviews } from '../constants'

export const Clients = () =>
{
  return (
    <section className="c-space my-20">
      <h3 className="head-text">Hear from My Clients</h3>
      <div className="client-container">
        {clientReviews.map(({ id, name, img, review, position }) => (
          <div className="client-review" key={id}>
            <div>
              <p className="text-white font-thin text-xs">{review}</p>
              <div className="client-content">
                <div className="flex gap-3">
                  <img src={img} alt={name} className='w-12 h-12 rounded-full' />
                  <div className="flex flex-col">
                    <p className='font-semibold text-white/80 text-xl'>{name}</p>
                    <p className="text-white/60 md:text-base text-sm font-light">{position}</p>
                  </div>
                </div>
                <div className="flex self-end items-center gap-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <img src='/assets/star.png' alt="star" className="w-5 h-5" key={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
