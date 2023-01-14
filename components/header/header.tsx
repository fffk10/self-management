import { Fragment, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import { Disclosure, Menu, Transition, Dialog } from '@headlessui/react'
import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline'

import utilStyles from '../../styles/utils.module.css'
import { MenuItem } from './headerIF'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Header main menu.
 */
const navigation: MenuItem[] = [
  { name: 'Dashboard', href: 'dashboard' },
  { name: 'NFT', href: 'nft' },
  { name: 'Calendar', href: 'calendar' },
]

/**
 * Dropdown menu when click profile image. 
 */
const userNavigation: MenuItem[] = [
  { name: 'Your Profile', href: 'profile' },
  { name: 'Settings', href: 'settings' },
  { name: 'Sign out', href: '' },
]

/**
 * Site header.
 */
export default function Header() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  /**
   * Open logout check modal.
   */
  const openModal = () => {
    setIsOpen(true)
  }

  /**
   * Close modal.
   */
  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <div className={"sticky top-0 z-40"}>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">

                  {/** Mobile menu button */}
                  <div className="-mr-2 flex md:hidden">
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    </Disclosure.Button>
                  </div>

                  {/** Utils header */}
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Link href="dashboard">
                        <Image
                          priority={true}
                          src={"/images/logo.png"}
                          className={`${utilStyles.borderCircle} md:justify-center`}
                          width={60}
                          height={41}
                          alt={'logo'} />
                      </Link>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={classNames('text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                            )}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {session ?
                    <div className="hidden md:block">
                      {/** State login */}
                      <div className="ml-4 flex items-center md:ml-6">
                        <button
                          type="button"
                          className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="sr-only">Open user menu</span>
                              <Image
                                priority={true}
                                src={session.user?.image as string}
                                className={utilStyles.borderCircle}
                                height={35}
                                width={35}
                                alt={'profile image'} />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <Link
                                      href={item.href}
                                      onClick={() => { item.name == "Sign out" ? openModal() : "" }}
                                      className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700 w-full'
                                      )}
                                    >
                                      {item.name}
                                    </Link>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                    :
                    <button
                      onClick={() => signIn("google", { callbackUrl: process.env.REDIRECT_URI })}
                      className={'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'}
                    >
                      Sign in
                    </button>
                  }
                  {session
                    /** brank is instead of sign in. */
                    ? <div className='sm:hidden flex items-center'></div>
                    : <></>
                  }
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as={Link}
                      href={item.href}
                      className={classNames('text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
                      )}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                {session ?
                  <div className="border-t border-gray-700 pt-4 pb-3">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <Image
                          priority={true}
                          src="/images/profile.jpg"
                          className={utilStyles.borderCircle}
                          height={35}
                          width={35}
                          alt={'profile image'} />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">{session?.user?.name}</div>
                        <div className="text-sm font-medium leading-none text-gray-400">{session?.user?.email}</div>
                      </div>
                      <button
                        type="button"
                        className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      {userNavigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as={Link}
                          href={item.href}
                          onClick={() => { item.name == "Sign out" ? openModal() : "" }}
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  </div>
                  : <></>}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/** Logout modal */}
        <Transition show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      ログアウトしますか？
                    </Dialog.Title>

                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-black-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        キャンセル
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-700 px-4 py-2 text-sm font-medium text-black-900 hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                        onClick={() => signOut()}
                      >
                        ログアウトする
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div >
  );
}
