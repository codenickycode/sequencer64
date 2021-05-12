import { Button } from 'App/shared/Button';

export const SaveJSX = ({
  online,
  loggedIn,
  save,
  newName,
  handleNewName,
  fetching,
  userError,
  confirmation,
  fileLimit,
}) => {
  return (
    <div className='save'>
      <form id='save-form' onSubmit={save}>
        <h1 className='header flexBetween'>
          Save
          <span className='saveLocation'>{`(saving to ${
            online && loggedIn ? 'cloud and device' : 'device'
          })`}</span>
        </h1>

        <div className='saveInputWrapper'>
          <input
            id='saveSequenceInput'
            className='nameInput'
            type='text'
            value={newName}
            onChange={handleNewName}
            disabled={fetching || fileLimit <= 0}
            placeholder={fetching ? 'saving...' : 'Enter sequence name'}
          />
          <Button type='submit' disabled={!newName}>
            Save
          </Button>
        </div>
      </form>
      <p className={userError ? 'error' : 'confirmation'}>
        {userError ? userError : confirmation}
      </p>
      <div className='fileLimit'>
        <p>
          File limit:
          <span className={fileLimit <= 0 ? 'error' : ''}>{fileLimit}</span>
        </p>
        {fileLimit <= 0 && <p className='error'>Delete some old sequences to save</p>}
      </div>
    </div>
  );
};
