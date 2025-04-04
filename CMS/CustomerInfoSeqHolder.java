package CMS;

/**
 * Generated from IDL alias "CustomerInfoSeq".
 *
 * @author JacORB IDL compiler V 3.9
 * @version generated at Apr 4, 2025, 3:18:30 AM
 */

public final class CustomerInfoSeqHolder
	implements org.omg.CORBA.portable.Streamable
{
	public CMS.CustomerInfo[] value;

	public CustomerInfoSeqHolder ()
	{
	}
	public CustomerInfoSeqHolder (final CMS.CustomerInfo[] initial)
	{
		value = initial;
	}
	public org.omg.CORBA.TypeCode _type ()
	{
		return CustomerInfoSeqHelper.type ();
	}
	public void _read (final org.omg.CORBA.portable.InputStream in)
	{
		value = CustomerInfoSeqHelper.read (in);
	}
	public void _write (final org.omg.CORBA.portable.OutputStream out)
	{
		CustomerInfoSeqHelper.write (out,value);
	}
}
