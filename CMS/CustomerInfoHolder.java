package CMS;

/**
 * Generated from IDL struct "CustomerInfo".
 *
 * @author JacORB IDL compiler V 3.9
 * @version generated at Apr 4, 2025, 3:18:30 AM
 */

public final class CustomerInfoHolder
	implements org.omg.CORBA.portable.Streamable
{
	public CMS.CustomerInfo value;

	public CustomerInfoHolder ()
	{
	}
	public CustomerInfoHolder(final CMS.CustomerInfo initial)
	{
		value = initial;
	}
	public org.omg.CORBA.TypeCode _type ()
	{
		return CMS.CustomerInfoHelper.type ();
	}
	public void _read(final org.omg.CORBA.portable.InputStream _in)
	{
		value = CMS.CustomerInfoHelper.read(_in);
	}
	public void _write(final org.omg.CORBA.portable.OutputStream _out)
	{
		CMS.CustomerInfoHelper.write(_out, value);
	}
}
