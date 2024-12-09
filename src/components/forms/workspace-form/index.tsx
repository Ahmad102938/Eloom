import FormGenerator from '@/components/global/form-generator';
import Loader from '@/components/global/loader';
import { useCreateWorkspace } from '@/hooks/useCreateWorkspace';
import React from 'react'
import { Button } from '@/components/ui/button';

type props = {}

const WorkspaceForm = (props:props) => {
    const  {errors, isPending, onFormSubmit, register, } = useCreateWorkspace();
    return <form onSubmit={onFormSubmit} className='flex flex-col gap-y-3'>
        <FormGenerator 
            register={register}
            name="name"
            placeholder={'Workspace Name'}
            label= {`Workspace's Name`}
            errors={errors}
            inputTypes='input'
            type='text'
        />
        <Button className='text-sm w-full mt-2' type='submit' disabled={isPending}>
            <Loader state={isPending}>Create Workspace</Loader>
        </Button>
    </form>
}

export default WorkspaceForm