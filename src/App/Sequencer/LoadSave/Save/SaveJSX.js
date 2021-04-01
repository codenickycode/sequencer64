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
    <div className='save-sequence-group'>
      <form id='save-form' onSubmit={save}>
        <h1 className='save-header flex-between'>
          Save:
          <span className='save-location'>{`(saving to ${
            online && loggedIn ? 'cloud and device' : 'device'
          })`}</span>
        </h1>

        <div className='save-sequence-input'>
          <input
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
      <div className='file-limit'>
        <p className='file-limit-p'>
          File limit:
          <span
            className={
              fileLimit <= 0 ? 'file-limit-span error' : 'file-limit-span'
            }
          >
            {fileLimit}
          </span>
        </p>
        {fileLimit <= 0 && (
          <p className='file-limit-instructions error'>
            Delete some old sequences to save
          </p>
        )}
      </div>
    </div>
  );
};
