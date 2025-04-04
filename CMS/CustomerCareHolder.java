package CMS;

/**
 * Generated from IDL struct "CustomerCare".
 *
 * @author JacORB IDL compiler V 3.9
 * @version generated at Apr 4, 2025, 3:18:30 AM
 */

public final class CustomerCareHolder
	implements org.omg.CORBA.portable.Streamable
{
	public CMS.CustomerCare value;

	public CustomerCareHolder ()
	{
	}
	public CustomerCareHolder(final CMS.CustomerCare initial)
	{
		value = initial;
	}
	public org.omg.CORBA.TypeCode _type ()
	{
		return CMS.CustomerCareHelper.type ();
	}
	public void _read(final org.omg.CORBA.portable.InputStream _in)
	{
		value = CMS.CustomerCareHelper.read(_in);
	}
	public void _write(final org.omg.CORBA.portable.OutputStream _out)
	{
		CMS.CustomerCareHelper.write(_out, value);
	}
}
